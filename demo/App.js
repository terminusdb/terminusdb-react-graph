import React, {useState,useEffect} from 'react';
import {GraphComponent} from '@terminusdb/terminusdb-react-graph';
import TerminusClient from '@terminusdb/terminusdb-client'

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
   woqlGraphConfig.height(500).width(800)

  // woqlGraphConfig.node("Element").v("scm:order_line_product").size(30)

   useEffect(() => {
      const dbClient = new TerminusClient.WOQLClient();
         dbClient.connect(server, key).then(function(response){
         dbClient.connectionConfig.setDB(db);
         console.log('query', query)
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


  if(myviewer)console.log("____CONFIG____", myviewer.config);

	return (<div style={{border:'1px solid'}}> <button onClick={reloadGraph}>Reload</button>
				GRAPH COMPONENT {reload}
				{myviewer && <GraphComponent
                    config={myviewer.config}
                    dataProvider={myviewer}/>}

			</div>)

}

export default App;
