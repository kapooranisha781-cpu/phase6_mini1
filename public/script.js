const progressForm = document.getElementById("progressForm");
const progressList = document.getElementById("progressList");

// Add progress
progressForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const courseName = document.getElementById("courseName").value;
    const completionPercentage = document.getElementById("completionPercentage").value;

    const progressData = {
        studentName,
        courseName,
        completionPercentage
    };

    try {
        const response = await fetch("/api/progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(progressData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Progress added successfully!");

            progressForm.reset();

            getProgress();
        } else {
            alert(data.message || "Something went wrong");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Unable to add progress");
    }
});


// Get all progress
async function getProgress() {

    try {
        const response = await fetch("/api/progress");

        const data = await response.json();

        progressList.innerHTML = "";

        data.forEach((progress) => {

            const card = document.createElement("div");

            card.className = "progress-card";

            card.innerHTML = `
                <h3>${progress.studentName}</h3>

                <p class="course">
                    ${progress.courseName}
                </p>

                <div class="progress-container">
                    <div 
                        class="progress-bar"
                        style="width: ${progress.completionPercentage}%"
                    ></div>
                </div>

                <p class="percentage">
                    ${progress.completionPercentage}% Complete
                </p>

                <p class="date">
                    Last Updated:
                    ${new Date(progress.lastUpdated).toLocaleDateString()}
                </p>
            `;

            progressList.appendChild(card);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}


// Load progress when page opens
getProgress();