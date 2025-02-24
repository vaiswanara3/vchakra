document.addEventListener('DOMContentLoaded', function() {
    const nakshatras = [
        "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
        "Magha", "Pubba", "Uttara", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula",
        "PurvAshadha", "UttarAshadha", "Shravana", "Dhanishta", "Shatabhisha", "PurvaBhadra", "UttaraBhadra", "Revati"
    ];

    const moonIndexTable = [
        { index: 1, direction: "Madhyama", result: "BAD" },
        { index: 2, direction: "Madhyama", result: "BAD" },
        { index: 3, direction: "East", result: "Good" },
        { index: 4, direction: "East", result: "Good" },
        { index: 5, direction: "East", result: "Good" },
        { index: 6, direction: "South East", result: "Good" },
        { index: 7, direction: "South East", result: "Good" },
        { index: 8, direction: "South East", result: "Good" },
        { index: 9, direction: "South", result: "BAD" },
        { index: 10, direction: "South", result: "BAD" },
        { index: 11, direction: "South", result: "BAD" },
        { index: 12, direction: "South West", result: "Good" },
        { index: 13, direction: "South West", result: "Good" },
        { index: 14, direction: "South West", result: "Good" },
        { index: 15, direction: "West", result: "BAD" },
        { index: 16, direction: "West", result: "BAD" },
        { index: 17, direction: "West", result: "BAD" },
        { index: 18, direction: "North West", result: "BAD" },
        { index: 19, direction: "North West", result: "BAD" },
        { index: 20, direction: "North West", result: "BAD" },
        { index: 21, direction: "North", result: "Good" },
        { index: 22, direction: "North", result: "Good" },
        { index: 23, direction: "North", result: "Good" },
        { index: 24, direction: "North East", result: "Good" },
        { index: 25, direction: "North East", result: "Good" },
        { index: 26, direction: "North East", result: "Good" },
        { index: 27, direction: "Madhyama", result: "BAD" }
    ];

    document.getElementById('calculateButton').addEventListener('click', function() {
        var dateInput = document.getElementById('date').value;
        console.log('Calculating for date:', dateInput);

        fetch('2025-2050.xlsx')
            .then(response => response.arrayBuffer())
            .then(data => {
                var workbook = XLSX.read(data, { type: 'array' });
                var sheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[sheetName];
                var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                console.log('Excel data:', jsonData);

                var result = jsonData.find(row => row[0] === dateInput);

                if (result) {
                    var sunNakshatra = result[2];
                    var moonNakshatra = result[3];
                    var sunIndex = nakshatras.indexOf(sunNakshatra);
                    
                    if (sunIndex === -1 || nakshatras.indexOf(moonNakshatra) === -1) {
                        document.getElementById('result').innerText = 'Invalid Nakshatra data.';
                        return;
                    }

                    // Generate Sun Nakshatra cycle
                    var sunTableIndex = [];
                    for (var i = 0; i < 27; i++) {
                        sunTableIndex.push(nakshatras[(sunIndex + i) % 27]);
                    }

                    // Find Moon Nakshatra index in the new cycle
                    var moonIndex = sunTableIndex.indexOf(moonNakshatra) + 1; // 1-based index

                    // Get Direction and Result based on Moon Index
                    var moonData = moonIndexTable.find(entry => entry.index === moonIndex);

                    document.getElementById('result').innerHTML = `
                        <table>
                            <tr><th>Date</th><td>${result[0]}</td></tr>
                            <tr><th>Weekday</th><td>${result[1]}</td></tr>
                            <tr><th>Sun Nakshatra</th><td>${result[2]}</td></tr>
                            <tr><th>Moon Nakshatra</th><td>${result[3]}</td></tr>
                            <!-- <tr><th>Sun Longitude</th><td>${result[4]}</td></tr> -->
                            <!-- <tr><th>Moon Longitude</th><td>${result[5]}</td></tr> -->
                            <!-- <tr><th>Nakshatra Cycle</th><td>${sunTableIndex.join(', ')}</td></tr> -->
                            <!-- <tr><th>Moon Nakshatra Index</th><td>${moonIndex}</td></tr> -->
                            <tr><th>Direction</th><td>${moonData ? moonData.direction : 'N/A'}</td></tr>
                            <tr><th>Result</th><td>${moonData ? moonData.result : 'N/A'}</td></tr>
                        </table>
                    `;
                } else {
                    document.getElementById('result').innerText = 'No data found for the given date.';
                }
            })
            .catch(error => console.error('Error:', error));
    });
});
