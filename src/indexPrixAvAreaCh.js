import * as helper from './scripts/explCoutAvArea/helper'
import * as preproc from "./scripts/explCoutAvArea/preprocess"
import * as viz from './scripts/explCoutAvArea/viz'

/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

(function (d3) {
  const margin = { top: 50, right: 0, bottom: 50, left: 75 }
  let svgSize, graphSize, bounds;

  const xScale = d3.scaleLinear()
  const yScale = d3.scaleLinear()

  const g = helper.generateG(margin)
  helper.appendAxes(g)
  helper.appendGraphLabels(g)


  d3.csv("./donnees_habitations.csv", d3.autoType).then(function (data) {
    const extracted_data = preproc.endResult(data)
    
    setSizing();
    build();

    function setSizing() {
      bounds = d3.select('.graph-prix-av-area').node().getBoundingClientRect()

      svgSize = {
        width: bounds.width,
        height: 700
      }

      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top,
      };
      helper.setCanvasSize(svgSize.width, svgSize.height)
    }
    function build() {
      helper.positionLabels(graphSize.width, graphSize.height);
      
      viz.updateXScale(xScale, extracted_data, graphSize.width);
      viz.updateYScale(yScale, extracted_data, graphSize.height);

      helper.drawXAxis(xScale, graphSize.height);
      helper.drawYAxis(yScale);
      
      viz.drawCircles(yScale, xScale, extracted_data)
    }

    window.addEventListener("resize", () => {
      setSizing();
      build();
    });
  });
})(d3);
