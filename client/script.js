

function validTwitteUser(sn) {
    return /^[a-zA-Z0-9_]{1,15}$/.test(sn);
}

function stopit()
{
    document.getElementById('loading').hidden = true;
}
function startit()
{
    document.getElementById('loading').hidden = false;
 
}
function download()
{
    setTimeout(() => {
        document.getElementById('im').style.background = "white";
        var elm = document.getElementById('im');
        domtoimage.toBlob(elm, {
            height: 1600,
            width: 1600,
            style: {
                transform: "scale(" + 2 + ")",
                transformOrigin: "top left",
                width: "1000px",
                height: "1000px"
            }
        })
        .then(function (png) {
            window.saveAs(png, 'tweepsume.png');
        });
        }, 1);
}
function kick() {
    startit()
    var node = document.getElementById('circleBar-web-chart');
    node.innerHTML = "";
    node = document.getElementById('circleBar-web-labels');
    node.innerHTML = "";
    document.getElementById("graph").style.display = "block";
    console.log("working")
    var chartData = {}
    var handle = document.getElementById("handle").value;
    document.getElementById("circleBar-web-text").innerHTML = "@"+handle;
    if (handle == "") {
        document.getElementById("down").style.display = "none";

        document.getElementById("graph").style.display = "none";
        document.getElementById('handle').style.borderColor = "red";
        stopit()
        return;
    }
    if (!validTwitteUser(handle)) {
        document.getElementById("graph").style.display = "none";
        document.getElementById("down").style.display = "none";

        document.getElementById('handle').style.borderColor = "red";
        stopit()
        return;
    }
    document.getElementById('handle').style.borderColor = "green";

    let url = 'https://tweepsume.herokuapp.com/v1/' + handle;
    console.log("break2");
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(dat => {
            var data = dat;
            var newdata = new Array();
            for (let i = 0; i < data['values'].length; i++) {
                var temp = {}
                temp['value'] = (data['values'][i]['percentile']);
                temp['label'] = data['values'][i]['name'];
                temp['fill'] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                newdata.push(temp);
            }
            for (let i = 0; i < data['needs'].length; i++) {
                var temp = {}
                temp['value'] = (data['needs'][i]['percentile']);
                temp['label'] = data['needs'][i]['name'];
                temp['fill'] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                newdata.push(temp);
            }
            for (let i = 0; i < data['personality'].length; i++) {
                var temp = {}
                temp['value'] = (data['personality'][i]['percentile']);
                temp['label'] = data['personality'][i]['name'];
                temp['fill'] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                newdata.push(temp);
                for (let k = 0; k < data['personality'][i]['children']; k++) {
                    var temp2 = {}
                    temp2['value'] = (data['personality'][i]['children']['percentile']);
                    temp2['label'] = data['personality'][i]['children']['name'];
                    temp2['fill'] = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
                    newdata.push(temp2);
                }
            }

            newdata.sort(function (a, b) { return b['value'] - a['value'] });
            return newdata;

        })
        .then(ndata => {
            var iter = 0.1;
            for (let j = 0; j < ndata.length; j++) {
                ndata[j]['index'] = iter;
                iter = iter + 0.1;
            }
            var result = {}
            result['barCircleWeb'] = ndata;
            chartData = result;
            console.log("break3");
            console.log(chartData);
            var node = document.getElementById('circleBar-web-chart');
            node.innerHTML = "";
            node = document.getElementById('circleBar-web-labels');
            node.innerHTML = "";
            setTimeout(function () { drawBarCircleChart(chartData.barCircleWeb, "#circleBar-web-chart", "#circleBar-web-values", "#circleBar-web-labels") }, 500);
            document.getElementById("down").style.display = "block";
            stopit()
        })
        .catch(function () {
            document.getElementById("graph").style.display = "none";
            document.getElementById("down").style.display = "none";

            document.getElementById('handle').style.borderColor = "red";
            stopit()
        });



}



function drawBarCircleChart(data, target, values, labels) {

    var w = 362,
        h = 362,
        size = data[0].value * 1.15,
        radius = 200,
        sectorWidth = .1,
        radScale = 25,
        sectorScale = 1.45,
        target = d3.select(target),
        valueText = d3.select(values),
        labelText = d3.select(labels);


    var arc = d3.svg.arc()
        .innerRadius(function (d, i) { return (d.index / sectorScale) * radius + radScale; })
        .outerRadius(function (d, i) { return ((d.index / sectorScale) + (sectorWidth / sectorScale)) * radius + radScale; })
        .startAngle(Math.PI)
        .endAngle(function (d) { return Math.PI + (d.value / size) * 2 * Math.PI; });

    var path = target.selectAll("path")
        .data(data);

    path.enter().append("svg:path")
        .attr("fill", function (d, i) { return d.fill })
        .attr("stroke", "#D1D3D4")
        .transition()
        .ease("elastic")
        .duration(1000)
        .delay(function (d, i) { return i * 200 })
        .attrTween("d", arcTween);



    labelText.selectAll("tspan").data(data).enter()
        .append("tspan")
        .attr({
            x: 0,
            y: function (d, i) { return i * 15 }
        })
        .text(function (d, i) { return data[i].label });

    function arcTween(b) {
        var i = d3.interpolate({ value: 0 }, b);
        return function (t) {
            return arc(i(t));
        };
    }
    d3.select("#circleBar-web-icon")
        .transition()
        .delay(500)
        .duration(500)
        .attr("opacity", "1");
    d3.select("#circleBar-web-text")
        .transition()
        .delay(750)
        .duration(500)
        .attr("opacity", "1");

    d3.select("#circleBar-web-clipLabels")
        .transition()
        .delay(600)
        .duration(1250)
        .attr("height", "800");
}

// Animation Queue



