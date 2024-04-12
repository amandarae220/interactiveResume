var roleOutput = document.getElementById("role");
roleOutput.innerHTML = "<i>(select a role to view more details)</i>";

/*************************
*        Hexbins        *
* **********************/

// Opt + Cmd + Arrow Keys (to select and edit multiple lines)

// hexbin data:
skillsData = [
    { x: 0, y: 0, label: "" },
    { x: 20, y: 0, label: "" },
    { x: 40, y: 0, label: "" },
    { x: 60, y: 0, label: "" },
    { x: 80, y: 0, label: "" },
    { x: 10, y: 22, label: "css" },
    { x: 30, y: 22, label: "html" },
    { x: 50, y: 22, label: "javascript" },
    { x: 70, y: 22, label: "angular" },
    { x: 90, y: 22, label: "VBA" },
    { x: 0, y: 44, label: "" },
    { x: 20, y: 44, label: "d3.js" },
    { x: 40, y: 44, label: "tableau" },
    { x: 60, y: 44, label: "illustrator" },
    { x: 80, y: 44, label: "powershell" },
    { x: 10, y: 66, label: "servicenow" },
    { x: 30, y: 66, label: "mySQL" },
    { x: 50, y: 66, label: "jira" },
    { x: 70, y: 66, label: "stata" },
];

skillsContainerWidth = 530;
skillsContainerHeight = 300;


// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = skillsContainerWidth - margin.left - margin.right,
    height = skillsContainerHeight - margin.top - margin.bottom;

var xMax = d3.max(skillsData, d => d.x);
var xMin = d3.min(skillsData, d => d.x);

var yMax = d3.max(skillsData, d => d.y);
var yMin = d3.min(skillsData, d => d.y);

// Add X axis
var x = d3.scaleLinear()
    .domain([0, 128])
    .range([0, width]);

var svg2 = d3.select("#skillsContainer")
    .select("svg")

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, 90])
    .range([height, 0]);

// Reformat the data: d3.hexbin() needs a specific format
var inputForHexbinFun = []
skillsData.forEach(function (d) {
    inputForHexbinFun.push([x(d.x), y(d.y), (d.label)])  // Note that we had the transform value of X and Y !
})

var hexbin = d3.hexbin()
    .size([width, height])
    .radius((width / 5) / 2.2); // dictates the size of the hex

var svg2 = d3.select("#skillsContainer")
    .select("svg")

svg2.attr("viewBox", "0 0 " + width + " " + height)
    .append("g");

svg2.append("g")
    .selectAll(".hexagon")
    .data(inputForHexbinFun)
    .enter()
    .append("path")
    .attr("id", "hexbinTooltip")
    .attr("class", "hexagon")
    .attr("d", hexbin.hexagon())
    .attr("transform", function (d) {
        return "translate(" + d[0] + "," + d[1] + ")";
    })
    .attr("stroke", "#fff")
    .attr("stroke-width", "2px")
    .style("fill", function (d) {
        return "#7A2DFD"; //color(d.length); 
    });

svg2.append("g")
    .selectAll("labels")
    .data(inputForHexbinFun)
    .enter()
    .append("text")
    .attr("x", function (d) { return d[0] })
    .attr("y", function (d) { return d[1] })
    .text(function (d) {
        return d[2];
    })
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "bottom")
    .style("font-size", 12)
    .style("fill", "white")
    .style("font-weight", "bold")


/*************************
 *     Hexbin Filters    *
 * **********************/

var taskArray = [
    {
        task: "Web Dev & Data Viz Specialist",
        company: "Accenture Federal Services",
        location: "Washington, DC",
        startTime: "8/21/19", //year/month/day
        endTime: "3/18/24",
        details: "d3.js, angular, javascript, html, css, servicenow, jira, tableau, illustrator, inDesign",
        description: [
            "Build out UI components in <strong>Angular</strong> and <strong>ServiceNow</strong> in support of front-end UI development for a public-facing application",
            "Design and develop dynamic dashboards that provide clear, compelling, and interactive insights via <strong>D3.js/Angular</strong> through wireframe workshops with stakeholders",
            "Design infographics, icons, and other static visuals using <strong>Adobe Illustrator</strong> to enhance various mediums of deliverables"
        ]
    },

    {
        task: "Data Viz Specialist",
        company: "Mather Economics",
        location: "Atlanta, GA",
        startTime: "11/2/18",
        endTime: "7/1/19",
        details: "tableau, mySQL",
        description: [
            "Led wireframing and exploratory data analysis for new dashboard design initiatives using <strong>Tableau</strong> and <strong>mySQL</strong>",
            "Led multiple re-design efforts to improve utility and user experience for existing dashboards",
            "Extract data using <strong>SQL/Hive</strong> to investigate outcomes of various visualization methods and confirm data structure requirements"
        ]
    },

    {
        task: "Sr. Analyst",
        company: "Mather Economics",
        location: "Atlanta, GA",
        startTime: "11/2/17",
        endTime: "11/1/18",
        details: "tableau, stata, VBA, powershell",
        description: [
            "Launched product development efforts to migrate excel based reporting to <strong>Tableau</strong> & <strong>mySQL</strong>",
            "Built <strong>PowerShell</strong> and <strong>VBA</strong> automation to support ad hoc processes",
            "Trained and supported analysts with project setup and management"
        ]
    },

    {
        task: "Analyst",
        company: "Mather Economics",
        location: "Atlanta, GA",
        startTime: "8/1/15",
        endTime: "11/1/17",
        details: "stata, VBA, excel",
        description: [
            "Improved accuracy of forecasting tool from 4% variance to 0.5% through methodology improvements in <strong>Stata</strong>",
            "Constructed and implemented statistical models (customer retention, lifetime valuation, and churn probability) in addition to constrained optimization and A/B testing using <strong>Stata</strong>",
            "Developed customized revenue forecasts and annual budgets using <strong>Excel</strong> and <strong>VBA</strong>"
        ]
    },
];

for (var i = 0; i < taskArray.length; i++) {
    let daysDuration = (Math.round(new Date(taskArray[i].endTime) - new Date(taskArray[i].startTime)) / (1000 * 3600 * 24));
    let yearsDuration = (daysDuration / 365);
    let yearsDurationClean = Math.floor(yearsDuration);
    let timeDuration = "";
    if (yearsDuration > 1) {
        let months = Math.round((daysDuration - ((yearsDurationClean) * 365)) / 30);
        timeDuration = yearsDurationClean + " yrs " + months + " mo";
    } else {
        let months = Math.round((daysDuration / 30));
        timeDuration = months + " mo";
    }
    Object.assign(taskArray[i], { duration: timeDuration });
}

var w = 1200;
var h = 325;
var aspect = w / h;

console.log(width);
console.log(height);

var svg1 = d3.select("div#ganttChart")
    .append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox','0 0 1200 275')
    .attr('preserveAspectRatio','xMinYMin');


var dateFormat = d3.timeParse("%m/%d/%y");

var timeScale = d3.scaleTime()
    .domain([d3.min(taskArray, function (d) { return dateFormat(d.startTime); }),
    d3.max(taskArray, function (d) { return dateFormat(d.endTime); })])
    .range([0, w]);

makeGant(taskArray, w, h);

function makeGant(tasks, pageWidth, pageHeight) {

    var barHeight = 40;
    var gap = barHeight + 4;
    var topPadding = 45;
    var sidePadding = 0;

    makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
    drawRects(tasks, gap, topPadding, sidePadding, barHeight, pageWidth, pageHeight);
}


function drawRects(theArray, theGap, theTopPad, theSidePad, theBarHeight, w, h) {

    var bigRects = svg1.append("g")
        .selectAll("rect")
        .data(theArray)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * theGap + theTopPad - 2;
        })
        .attr("width", w)
        .attr("height", theGap)
        .attr("stroke", "none")
        .attr("fill", "none")
    //.attr("opacity", 0.2);


    var rectangles = svg1.append('g')
        .selectAll("rect")
        .data(theArray)
        .enter();


    var innerRects = rectangles.append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", function (d) {
            return timeScale(dateFormat(d.startTime));
        })
        .attr("y", function (d, i) {
            return i * theGap + theTopPad;
        })
        .attr("width", function (d) {
            return (timeScale(dateFormat(d.endTime)) - timeScale(dateFormat(d.startTime)));
        })
        .attr("height", theBarHeight)
        .attr("stroke", "none")
        .attr("fill", "#6666ff")


    innerRects.on("mouseover", function (d) {
        vals = d3.select(this)._groups[0][0].__data__.details;

        var tag = "Duration: " + d3.select(this).data()[0].duration + "<br/>" +
            "(" + d3.select(this).data()[0].startTime + " - " + d3.select(this).data()[0].endTime + ")";

        var output = document.getElementById("tag");

        var x = (this.x.animVal.value + this.width.animVal.value / 2) -10 + "px";
        var y = this.y.animVal.value + 78 + "px";

        output.innerHTML = tag;
        output.style.top = y;
        output.style.left = x;
        output.style.display = "block";

    }).on('mouseout', function () {
        var output = document.getElementById("tag");
        output.style.display = "none";
    });

    innerRects.on("click", function (d) {

        if (!d3.select(this).classed("selected")) {

            // if another tag has already been selected, remove the 'selected' class 
            if (d3.select("body").selectAll(".selected")) {
                    // the user should only be able to select one role at a time 
                    d3.select("body").selectAll(".selected").classed("selected",false);
            };

            // add the 'selected' class to the newly selected tag 
            d3.select(this).classed("selected", true)

            // get the skills associated with the selected role in the gantt so we can filter the skills hexagons
            vals = d3.select(this)._groups[0][0].__data__.details;

            // hide skills that aren't included in the role
            svg2.selectAll("text")
                .transition()
                .duration(0)
                .filter(function () {
                    return !vals.includes(d3.select(this).text());
                })
                .style("opacity", "0");

            // show skills that are included in the role
            svg2.selectAll("text")
                .transition()
                .duration(0)
                .filter(function () {
                    return vals.includes(d3.select(this).text());
                })
                .style("opacity", "1");

            

            // get the role info for the details container
            var role = d3.select(this).data()[0].task;
            var roleOutput = document.getElementById("role");
            roleOutput.innerHTML = role;

            var company = d3.select(this).data()[0].company;
            var companyOutput = document.getElementById("company");
            companyOutput.innerHTML = company;

            var location = d3.select(this).data()[0].location;
            var locationOutput = document.getElementById("location");
            locationOutput.innerHTML = location;

            var duration = d3.select(this).data()[0].duration;
            var durationOutput = document.getElementById("duration");
            durationOutput.innerHTML = duration;

            var description = d3.select(this).data()[0].description;
            var str = '<ul style="margin-top: 6px;">'

            description.forEach(function (desc) {
                str += '<li>' + desc + '</li>';
            });
            str += '</ul>';

            var descriptionOutput = document.getElementById("description");
            descriptionOutput.innerHTML = str;

        } else {

            // remove the 'selected' class since the user is deselecting the role 
            d3.select(this).classed("selected", false);

            // get the skills associated with the selected role in the gantt so we can filter the skills hexagons
            vals = d3.select(this)._groups[0][0].__data__.details;

            // show all skills in the hexagon since nothing should be selected at this point 
            svg2.selectAll("text")
                .transition()
                .duration(0)
                .filter(function () {
                    return !vals.includes(d3.select(this).text());
                })
                .style("opacity", "1");

            var roleOutput = document.getElementById("role");
            roleOutput.innerHTML = " <i>(select a role to view more details)</i> ";

            var companyOutput = document.getElementById("company");
            companyOutput.innerHTML = " ";

            var locationOutput = document.getElementById("location");
            locationOutput.innerHTML = " ";

            var durationOutput = document.getElementById("duration");
            durationOutput.innerHTML = " ";

            var descriptionOutput = document.getElementById("description");
            descriptionOutput.innerHTML = " ";

            var output = document.getElementById("tag");
            output.style.display = "none";
        }
    });


    var rectText = rectangles.append("text")
        .text(function (d) {
            return d.task;
        })
        .attr("x", function (d) {
            return (timeScale(dateFormat(d.endTime)) - timeScale(dateFormat(d.startTime))) / 2 + timeScale(dateFormat(d.startTime)) + theSidePad;
        })
        .attr("y", function (d, i) {
            return i * theGap + 24 + theTopPad;
        })
        .attr("font-size", 11)
        .attr("text-anchor", "middle")
        .attr("text-height", theBarHeight)
        .attr("fill", "#fff")
        .attr("class", "balance");

    rectText.on("mouseover", function (d) {
        vals = d3.select(this)._groups[0][0].__data__.details;

        var tag = "Duration: " + d3.select(this).data()[0].duration + "<br/>" +
            "(" + d3.select(this).data()[0].startTime + " - " + d3.select(this).data()[0].endTime + ")";

        var output = document.getElementById("tag");

        var x = (this.x.animVal.value + this.width.animVal.value / 2) + 115 + "px";
        var y = this.y.animVal.value + 140 + "px";

        output.innerHTML = tag;
        output.style.top = y;
        output.style.left = x;
        output.style.display = "block";

    }).on('mouseout', function () {
        var output = document.getElementById("tag");
        output.style.display = "none";
    });

}


function makeGrid(theSidePad, theTopPad, w, h) {

    var xAxis = d3.axisBottom()
        .scale(timeScale)
        //.tickSize(-h+theTopPad+20, 0, 0)    // long gray tick lines removed
        .tickFormat(d3.timeScale);

    var grid = svg1.append('g')
        .attr('class', 'grid')
        .attr("transform", "translate(" + 1 + "," + 240 + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("stroke", "none")
        .attr("font-size", 12)
        .attr("dy", "1em");
}


d3.selectAll('.hexagon').on('mouseover', function (d) {

    vals = d3.select(this)._groups[0][0].__data__[2];
    console.log(vals);
    // set the background color for the selected bar in the gantt
    d3.select(this).attr("fill", "#6f00ff")
    // fade in/out the relevant skills in the hex chart

    svg1.selectAll("rect")
        .transition()
        .duration(0)
        .filter(function (d) {
            return d3.select(this)._groups[0][0].__data__.details.includes(vals);
        })
        .style("opacity", "1");

    svg1.selectAll("rect")
        .transition()
        .duration(0)
        .filter(function () {
            return !d3.select(this)._groups[0][0].__data__.details.includes(vals);
        })
        .style("opacity", "0.5");

})

d3.selectAll('.hexagon').on("mouseout", function (d) {
    //instructions for unselection
    svg1.selectAll("rect")
        .transition()
        .duration(0)
        .filter(function () {
            return !d3.select(this)._groups[0][0].__data__.details.includes(vals);
        })
        .style("opacity", "1");
});

