import React, { useEffect } from 'react';
import { Activity, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, ServerStatusCard } from '../../components/card/DashboardCard';

const Dashboard = () => {
 const serverStatus = {
   kt: { status: 'normal', latency: '30ms', dns: '17ms' },
   lgu: { status: 'normal', latency: '29ms', dns: '12ms' },
   skb: { status: 'normal', latency: '34ms', dns: '18ms' }
 };

 const getGrafanaUrl = () => {
   const baseUrl = 'http://192.168.0.143:32647';
   return `${baseUrl}/d/k8s_views_global/kubernetes-views-global?orgId=1&from=now-1h&to=now&var-datasource=prometheus&var-cluster=&var-resolution=30s&var-job=node-exporter&refresh=30s`;
 };

 useEffect(() => {
  window.scrollTo(0, 0);
}, []);

 return (
   <div className="space-y-4">
     <div className="flex items-center justify-between">
       <div className="mb-7">
         <h1 className="text-2xl font-bold">통합 모니터링 대시보드</h1>
         <p className="text-sm text-gray-500">실시간 서버 상태 및 성능 모니터링</p>
       </div>
       <div className="text-sm text-gray-600">
         최종 업데이트: {new Date().toLocaleString()}
       </div>
     </div>

     {/* 시스템 리소스 모니터링 */}
     <Card>
       <CardHeader>
         <CardTitle>시스템 리소스 모니터링</CardTitle>
       </CardHeader>
       <CardContent>
         <div className="h-[550px]">
           <iframe
             src={getGrafanaUrl()}
             className="w-full h-full border-0 rounded-lg"
             sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation"
             referrerPolicy="no-referrer"
             title="System Resources"
           />
         </div>
       </CardContent>
     </Card>

     {/* 서버 상태 카드 */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {Object.entries(serverStatus).map(([provider, data]) => (
         <ServerStatusCard 
           key={provider}
           provider={provider}
           data={data}
         />
       ))}
     </div>

     {/* 그래프 섹션 */}
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* 응답시간 그래프 */}
       <Card>
         <CardHeader>
           <CardTitle icon={Activity}>페이지 응답시간</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="h-[300px] bg-gray-50 rounded">
             <iframe 
               src="http://192.168.0.143:30117/kibana/app/dashboards#/view/a6f695e3-9fa8-4173-bf17-1dee79887759?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:'2024-12-05T06:00:00.000Z',to:now))&_a=()&hide-filter-bar=true"
               height="600" width="800"
               sandbox="allow-scripts allow-same-origin"
               referrerPolicy="no-referrer"
               className="w-full h-full border-0"
               title="Response Time Chart">
             </iframe>
           </div>
         </CardContent>
       </Card>

       {/* DNS 응답시간 그래프 */}
       <Card>
         <CardHeader>
           <CardTitle icon={Clock}>DNS 응답시간</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="h-[300px] bg-gray-50 rounded">
             <iframe
               src="http://192.168.0.143:30117/kibana/app/dashboards#/view/9ce63212-8ba1-4811-9085-c4cdedc428d5?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(from:'2024-12-05T06:30:00.000Z',to:'2024-12-05T07:00:00.000Z'))&_a=()&hide-filter-bar=true"
               sandbox="allow-scripts allow-same-origin"
               referrerPolicy="no-referrer" 
               className="w-full h-full border-0"
               title="DNS Response Time Chart"
             />
           </div>
         </CardContent>
       </Card>
     </div>

     {/* 이벤트 로그 */}
     <Card>
       <CardHeader>
         <CardTitle>시스템 이벤트 로그</CardTitle>
       </CardHeader>
       <CardContent>
         <table className="min-w-full">
           <thead>
             <tr className="bg-gray-50">
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">발생일시</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">정상복구 일시</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">경과시간</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">담당부서</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-200">
             <tr>
               <td className="px-6 py-4 text-sm">2023-12-04 08:35:44</td>
               <td className="px-6 py-4 text-sm">2023-12-04 08:53:44</td>
               <td className="px-6 py-4 text-sm">18분</td>
               <td className="px-6 py-4 text-sm">DEMO</td>
             </tr>
           </tbody>
         </table>
       </CardContent>
     </Card>
   </div>
 );
};

export default Dashboard;