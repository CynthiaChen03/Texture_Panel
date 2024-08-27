var provinceNames = ["Gansu", "Beijing", "Qinghai", "Guangxi", "Guizhou", "Chongqing", "Fujian", "Anhui", "Guangdong", "Xizang", "Xinjiang", "Hainan", "Ningxia", "Shaanxi", "Shanxi", "Hubei", "Hunan", "Sichuan", "Yunnan", "Hebei", "Henan", "Liaoning", "Shandong", "Tianjin", "Jiangxi", "Jiangsu", "Shanghai", "Zhejiang", "Jilin", "Inner Mongolia", "Heilongjiang", "Hong Kong", "Macao", "Taiwan"];

var globalIndex = 1; // 声明全局变量 index
var Gridangle = 0;
function definePatterns(svg) {
    // Ensure we define it only once
    if (!svg.select("#defs").empty()) return;

    var defs = svg.append("defs");

    provinceNames.forEach(function (name) {
        var index = globalIndex; // 使用全局变量 index
        var patternId = name.toLowerCase().replace(/ /g, "_") + "-pattern";
        var rotateAngle = Math.floor(Math.random() * 360); // 生成一个0到359度之间的随机角度
        var pattern = defs.append("pattern")
            .attr("id", patternId)
            .attr("patternUnits", "userSpaceOnUse")
            .attr("width", 10)
            .attr("height", 10)
            .attr("patternTransform", `rotate(${rotateAngle})`); // 应用旋转

        // Example patterns - we can vary them by index to add more diversity
        if (index % 3 == 0) {
            //Dot pattern
            pattern.append("circle")
                .attr("cx", 5)
                .attr("cy", 5)
                .attr("r", 2)
                .style("fill", "black");
        } else if (index % 3 == 1) {
            //Line pattern
            pattern.append("path")
                .attr("d", "M0,5L10,5") // Draw a horizontal line
                // .attr("transform", "rotate(10,0,0)")
                .style("stroke", "black")
                .style("stroke-width", 1); // Set thickness
        } else {
            pattern.append("path")
                .attr("d", "M0,0L10,0M0,0L0,10")
                .style("stroke", "black")
                .style("stroke-width", 2);
        }
        globalIndex++; // 更新全局变量 index
    });
}


function changePattern(svgSelector, provinceName, newPatternType) {
    console.log("Currently selected province:", d3.select(svgSelector).selectAll("path"));
    console.log("Change pattern called with province:", provinceName, "and pattern type:", newPatternType);

    var patternId = provinceName.toLowerCase().replace(/ /g, "_") + "-pattern";
    console.log("Pattern ID:", patternId);

    var pattern = d3.select(svgSelector).select("#" + patternId);
    console.log("Selected pattern:", pattern);

    if (!pattern.empty()) {
        pattern.selectAll("*").remove(); // 清除之前的图案内容

        // 根据新的图案类型添加新的图案
        if (newPatternType === "dot") {
            pattern.append("circle")
                .attr("cx", 5)
                .attr("cy", 5)
                .attr("r", 2)
                .style("fill", "black");
        } else if (newPatternType === "line") {
            pattern.append("path")
                .attr("d", "M0,5L10,5") // Draw a horizontal line
                // .attr("transform", "rotate(10,0,0)")
                .style("stroke", "black")
                .style("stroke-width", 1); // Set thickness
        } else if (newPatternType === "grid") {
            // 添加第一条水平线
            pattern.append("path")
                .attr("d", "M0,0L10,0")  // 从点 (0,0) 到点 (10,0)
                .attr("patternTransform", "rotate(" + Gridangle + ")")
                .style("stroke", "black")
                .style("stroke-width", 2);

            // 添加第二条垂直线
            pattern.append("path")
                .attr("d", "M0,0L0,10")  // 从点 (0,0) 到点 (0,10)
                .attr("patternTransform", "rotate(" + Gridangle + ")")
                .style("stroke", "black")
                .style("stroke-width", 2);
        }


        else if (newPatternType === "circle") {
            pattern.append("circle")
                .attr("cx", 5)
                .attr("cy", 5)
                .attr("r", 2)
                .style("fill", "none")
                .style("stroke", "black");

        }

    } else {
        console.log("Pattern not found for province:", provinceName);
    }
}
