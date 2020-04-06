import React, {useState,useEffect} from 'react';
import {GraphComponent} from '@terminusdb/terminus-react-graph';
import TerminusClient from '@terminusdb/terminus-client'

const App= (props) =>{

   const [reload,setReload] = useState(false)
   const [myviewer, setConfig] = useState(undefined);
   const WOQL = TerminusClient.WOQL;

   let query=WOQL.and(
            WOQL.quad("v:Element","type","Class","schema"),
            WOQL.opt().quad("v:Element","label","v:Label","schema"),
            WOQL.opt().quad("v:Element","comment","v:Comment","schema"),
            WOQL.opt().quad("v:Element","tcs:tag","v:Abstract","schema")
        );

   const reloadGraph=()=>{
      query=WOQL.and(
            WOQL.or(
                WOQL.quad("v:Property","type","DatatypeProperty","schema"),
                WOQL.quad("v:Property","type","ObjectProperty","schema")
            ),
            WOQL.opt().quad("v:Property","range","v:Range","schema"),
            WOQL.opt().quad("v:Property","type","v:Type","schema"),
            WOQL.opt().quad("v:Property","label","v:Label","schema"),
            WOQL.opt().quad("v:Property","comment","v:Comment","schema"),
            WOQL.opt().quad("v:Property","domain","v:Domain","schema")
        )
      setReload(Date.now())
   }

	const server=process.env.API_URL;
   const key=process.env.API_KEY
   const db=process.env.API_DB

   console.log("server",server)

  
   





   /*const query=WOQL.and(
       WOQL.quad("v:Element","type","v:Type","schema"),
       WOQL.opt().quad("v:Element","tcs:tag","v:Abstract","schema"),
       WOQL.opt().quad("v:Element","label","v:Label","schema"),
       WOQL.opt().quad("v:Element","comment","v:Comment","schema"),
       WOQL.opt().quad("v:Element","subClassOf","v:Parent","schema"),
       WOQL.opt().quad("v:Element","domain","v:Domain","schema"),
       WOQL.opt().quad("v:Element","range","v:Range","schema")
   )*/

  
   let result;

   const woqlGraphConfig= TerminusClient.View.graph();
   woqlGraphConfig.height(500).width(500) 

  // woqlGraphConfig.node("Element").v("scm:order_line_product").size(30)
   
   useEffect(() => {
      const dbClient = new TerminusClient.WOQLClient();       
         dbClient.connect(server, key).then(function(response){
         dbClient.connectionConfig.setDB(db);

         query.execute(dbClient).then((response)=>{
         result = new TerminusClient.WOQLResult(response,query);
         
         let viewer = woqlGraphConfig.create(null);
         
         viewer.setResult(result);
         setConfig(viewer)
         }).catch((err)=>{
            console.log(err)
         })
         
      }).catch((err)=>{
         console.log(err)
      })
   },[reload])

   
    const dataP=[
				      {"v:Date": 'Page A', "v:Quantity": 4000, pv: 2400, amt: 2400},
				      {"v:Date": 'Page B', "v:Quantity": 3000, pv: 1398, amt: 2210},
				      {"v:Date": 'Page C', "v:Quantity": 2000, pv: 9800, amt: 2290},
				      {"v:Date": 'Page D', "v:Quantity": 2780, pv: 3908, amt: 2000},
				      {"v:Date": 'Page E', "v:Quantity": 1890, pv: 4800, amt: 2181},
				      {"v:Date": 'Page F', "v:Quantity": 2390, pv: 3800, amt: 2500},
				      {"v:Date": 'Page G', "v:Quantity": 3490, pv: 4300, amt: 2100}
				]

	return (<div> <button onClick={reloadGraph}>Reload</button>
				GRAPH COMPONENT {reload}
				{myviewer && <GraphComponent config={myviewer.config} dataProvider={myviewer}/>}
       
			</div>)

}

export default App;