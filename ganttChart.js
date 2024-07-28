var roleOutput = document.getElementById("role");
roleOutput.innerHTML = "<i>(select a role to view more details)</i>";

latestRole = "";

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
    { x: 10, y: 21, label: "css" },
    { x: 30, y: 21, label: "html" },
    { x: 50, y: 21, label: "javascript" },
    { x: 70, y: 21, label: "angular" },
    { x: 90, y: 21, label: "mySQL" },
    { x: 0, y: 42, label: "" },
    { x: 20, y: 42, label: "d3.js" },
    { x: 40, y: 42, label: "tableau" },
    { x: 60, y: 42, label: "illustrator" },
    { x: 80, y: 42, label: "powershell" },
    { x: 10, y: 63, label: "servicenow" },
    { x: 30, y: 63, label: "angularJS" },
    { x: 50, y: 63, label: "jira" },
    { x: 70, y: 63, label: "typescript" },
];

skillsContainerWidth = 530;
skillsContainerHeight = 275;


// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 0, left: 40 },
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

var skillsSvg = d3.select("#skillsContainer")
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
    .radius((width / 5) / 2.25); // dictates the size of the hex

var skillsSvg = d3.select("#skillsContainer")
    .select("svg")

skillsSvg.attr("viewBox", "0 0 " + "460 " + "250")
    .append("g");

skillsSvg.append("g")
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
        return "#6666ff"; //color(d.length); 
    });

skillsSvg.append("g")
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
        details: "d3.js, angular, javascript, html, css, servicenow, jira, tableau, illustrator, inDesign, angularJS, typescript",
        description: [
            "Build out UI components in <strong>AngularJS</strong> and <strong>ServiceNow</strong> in support of front-end UI development for a public-facing application",
            "Design and develop dynamic dashboards that provide clear, compelling, and interactive insights via <strong>D3.js/Angular/typescript</strong> through wireframe workshops with stakeholders",
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
var h = 250;
var aspect = w / h;

console.log(width);
console.log(height);

var ganttSvg = d3.select("div#ganttChart")
    .append("svg")
    .attr("width", '100%')
    .attr("height", '100%')
    .attr('viewBox', '0 0 1200 255')
    .attr('preserveAspectRatio', 'xMinYMin');


var dateFormat = d3.timeParse("%m/%d/%y");

var timeScale = d3.scaleTime()
    .domain([d3.min(taskArray, function (d) { return dateFormat(d.startTime); }),
    d3.max(taskArray, function (d) { return dateFormat(d.endTime); })])
    .range([0, w]);

makeGant(taskArray, w, h);

function makeGant(tasks, pageWidth, pageHeight) {

    var barHeight = 40;
    var gap = barHeight + 4;
    var topPadding = 30;
    var sidePadding = 0;

    makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
    drawRects(tasks, gap, topPadding, sidePadding, barHeight, pageWidth, pageHeight);
}


function drawRects(theArray, theGap, theTopPad, theSidePad, theBarHeight, w, h) {

    var bigRects = ganttSvg.append("g")
        .selectAll("rect")
        .data(theArray)
        .enter()
        .append("g")
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * theGap + theTopPad - 2;
        })
        .attr("width", w)
        .attr("height", theGap)
        .attr("stroke", "none")
        .attr("fill", "none")
        .attr("class","unselected");


    var innerRects = bigRects.append("rect")
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
        .classed("unselected", true);

    var rectText = bigRects.append("text")
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
        //.attr("class", "balance")
        .classed("unselected", true);

       // #ganttChart > svg > g:nth-child(2) > g:nth-child(1)

    bigRects.on("click", function (d) {

        console.log(bigRects);

        if (d3.select(this).classed("unselected")) {

            // only one role can be selected at a time
            // find any previously selected roles and set it to being unselected
            d3.select("body").selectAll(".selected").classed("unselected", true).classed("selected", false);

            // add the 'selected' class to the newly selected g in the gantt along with its child rect & text
            d3.select(this).classed("selected", true).classed("unselected", false);
            d3.select(this).selectAll('text').classed("selected", true).classed("unselected", false);
            d3.select(this).selectAll('rect').classed("selected", true).classed("unselected", false);

            // get the skills associated with the selected role in the gantt so we can filter the skills hexagons
            vals = d3.select(this)._groups[0][0].__data__.details;

            thisRole = d3.select(this)._groups[0][0].__data__.task;

            // hide skills that aren't included in the role
            skillsSvg.selectAll("text")
                .transition()
                .duration(0)
                .filter(function () {
                    return !vals.includes(d3.select(this).text());
                })
                .style("opacity", "0");

            // new lighter background requires darker font color to contrast approriately
            skillsSvg.selectAll("text")
                .transition()
                .duration(0)
                .filter(function () {
                    return vals.includes(d3.select(this).text());
                })
                .style("fill", "#6666ff");

            skillsSvg.selectAll(".hexagon")
                .transition()
                .duration(0)
                .filter(function () {
                    var hexValue = d3.select(this)._groups[0][0].__data__[2];
                    return vals.includes(hexValue) && (hexValue !== '');
                })
                .style("fill", "#57e0fa");


            // show skills that are included in the role
            skillsSvg.selectAll("text")
                .transition()
                .duration(0)
                .filter(function () {
                    return vals.includes(d3.select(this).text());
                })
                .style("opacity", "1");
            //.style("color", "#6666ff");

            // change background color of skills that are included in the role
            skillsSvg.selectAll(".hexagon")
                .transition()
                .duration(0)
                .filter(function () {
                    var hexValue = d3.select(this)._groups[0][0].__data__[2];
                    return !vals.includes(hexValue) || (hexValue === '');
                })
                .style("fill", "#6666ff");

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
            d3.select(this).classed("selected", false).classed("unselected", true);
            d3.select(this).selectAll('text').classed("selected", false).classed("unselected", true);
            d3.select(this).selectAll('rect').classed("selected", false).classed("unselected", true);

            // get the skills associated with the selected role in the gantt so we can filter the skills hexagons
            vals = d3.select(this)._groups[0][0].__data__.details;

            // show all skills in the hexagon since nothing should be selected at this point 
            skillsSvg.selectAll("text")
                .transition()
                .duration(0)
                .filter(function () {
                    return !vals.includes(d3.select(this).text());
                })
                .style("opacity", "1");

                            // reset font color for hexagons
            skillsSvg.selectAll("text")
            .transition()
            .duration(0)
            .style("fill", "#FFFFFF");

            // reset font color for hexagons
            skillsSvg.selectAll("text")
                .transition()
                .duration(0)
                .filter(function () {
                    return vals.includes(d3.select(this).text());
                })
                .style("fill", "#FFFFFF");

            // reset hexagon skill colors
            skillsSvg.selectAll(".hexagon")
                .transition()
                .duration(0)
                .style("fill", "#6666ff");

            // set the text color for the selected rect
            ganttSvg.transition()
            .duration(0)
            .filter(function () {
                console.log(this);
                console.log(d3.select(this).text());
                return vals.includes(d3.select(this).text());
            })
            .style("fill", "#FFFFFF");

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
}


function makeGrid(theSidePad, theTopPad, w, h) {

    var xAxis = d3.axisBottom()
        .scale(timeScale)
        //.tickSize(-h+theTopPad+20, 0, 0)    // long gray tick lines removed
        .tickFormat(d3.timeScale);

    var grid = ganttSvg.append('g')
        .attr('class', 'grid')
        .attr("transform", "translate(" + 1 + "," + 220 + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("stroke", "none")
        .attr("font-size", 12)
        .attr("dy", "1em");
}
