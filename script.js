
function calculateWeeksUntilElection(date) {
    const electionDate = new Date('2024-11-05');
    let inputDate = new Date(`2024-${date}`);
            // Find the next Tuesday from the input date
            while (inputDate.getDay() !== 2) {  // 2 represents Tuesday (Sunday is 0)
                inputDate.setDate(inputDate.getDate() + 1);
            }

            const weeksUntilElection = Math.ceil((electionDate - inputDate) / (7 * 24 * 60 * 60 * 1000));
            return weeksUntilElection;
        }

    function calculateDaysUntilElection(date) {
        const electionDate = new Date('2024-11-05');
        let inputDate = new Date(`2024-${date}`);
        const daysUntilElection = Math.ceil((electionDate - inputDate) / (24 * 60 * 60 * 1000));
        return daysUntilElection;
        }

        document.addEventListener('DOMContentLoaded', (event) => {
            const date = new Date().toISOString().slice(5, 10); // Get current date in MM-DD format
            const weeksUntilElection = calculateWeeksUntilElection(date);
            const daysUntilElection = calculateDaysUntilElection(date);
            const countdownElement = document.getElementById('countdown');
            countdownElement.textContent = `${weeksUntilElection} weeks to go - ${daysUntilElection} days!`;
        });