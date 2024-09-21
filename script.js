
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
        return daysUntilElection;}
        function calculateMoochies(date) {
            const electionDate = new Date('2024-11-05T00:00:00');
            let inputDate = new Date(date);
            const minutesUntilElection = Math.ceil((electionDate - inputDate) / (60 * 1000));
            const moochiesUntilElection = (minutesUntilElection / 15840).toFixed(2);
            return moochiesUntilElection;
        }

        document.addEventListener('DOMContentLoaded', (event) => {
            const date = new Date().toISOString().slice(5, 10); // Get current date in MM-DD format
            const weeksUntilElection = calculateWeeksUntilElection(date);
            const daysUntilElection = calculateDaysUntilElection(date);
            const currentDateTime = new Date().toISOString();
            const moochiesUntilElection = calculateMoochies(currentDateTime);
            const countdownElement = document.getElementById('countdown');
            const daysElement = document.getElementById('days');
            const moochiesElement = document.getElementById('moochies');
            countdownElement.textContent = `${weeksUntilElection} weeks`;
            daysElement.textContent = `${daysUntilElection} days`;
            moochiesElement.textContent = `${moochiesUntilElection} Scaramuccis`;
        });