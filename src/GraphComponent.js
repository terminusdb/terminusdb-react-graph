import React, { useRef, useEffect } from 'react';
//import {setConfigOptions} from './utils'
//import "@fortawesome/fontawesome-free/css/fontawesome.css";
import GraphResultsViewer from './GraphResultsViewer'

const GraphComponent = (props) => {
  const d3Container = useRef(null);
  const graphResult=new GraphResultsViewer(props.config,props.dataProvider);
	useEffect(() => {
            if (props.dataProvider && d3Container.current) {
                graphResult.load(d3Container.current,true);
            }
        },

        /*
          useEffect has a dependency array (below). It's a list of dependency
          variables for this useEffect block. The block will run after mount
          and whenever any of these variables change. We still have to check
          if the variables are valid, but we do not have to compare old props
          to next props to decide whether to rerender.
        */
        [props.dataProvider, d3Container.current])

  const text="\uf128"

 return (
        <div>
          <i class="fa fa-child" ></i>
          <h3 className="labelClassName fa" style={{fontFamily:"FontAwesome"}}>{"\uf061"}</h3>
          <div
              className="d3-component"
              width={400}
              height={300}
              ref={d3Container}
          />
        </div>
    );
}

export default GraphComponent;
