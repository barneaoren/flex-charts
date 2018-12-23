# flex-charts
Simple CSS charts library, using flex-box model

## Installation
This module will be available soon via npm:

```
npm install --save flex-charts
```

### Creating horizontal bar chart
##### html
``` html
<div id="barHorizontal"></div> 
```
##### javascript
``` js
new flexCharts().barChartHorizontal({
    id: "barHorizontal",
    width: "400px",
    height:"200px",
    categories: ["category #1", "category #2"],
    data: [ 
        [200, 300], [250, 400], [150, 10], [50, 40],
        [500, 300], [280, 120], [500, 300], [280, 120], 
        [500, 300],  [280, 120], [500, 300], [280, 120] 
    ],
    labels: [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
     ]
});
```