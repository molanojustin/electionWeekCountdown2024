function calculateWeeksUntilElection(date) {
    const electionDate = new Date('2024-11-05');
    let inputDate = new Date(`2024-${date}`);
    while (inputDate.getDay() !== 2) {
        inputDate.setDate(inputDate.getDate() + 1);
    }
    const weeksUntilElection = Math.ceil((electionDate - inputDate) / (7 * 24 * 60 * 60 * 1000));
    return weeksUntilElection;
}

// Function to calculate days until election
function calculateDaysUntilElection(currentDate, electionDate) {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const diffDays = Math.ceil((electionDate - currentDate) / oneDay);
    return diffDays;
}

function calculateMooches(date) {
    const electionDate = new Date('2024-11-05T00:00:00');
    let inputDate = new Date(date);
    const secondsUntilElection = Math.ceil((electionDate - inputDate) / 1000);
    const moochesUntilElection = (secondsUntilElection / (15840*60)).toFixed(6);
    return moochesUntilElection;
}

async function fetchQuotes() {
    try {
        const response = await fetch('quotes.csv');
        const data = await response.text();
        
        // Parse CSV content using PapaParse
        const parsedData = Papa.parse(data, {
            header: false,
            skipEmptyLines: true
        });

        // Extract the second column
        const quotes = parsedData.data.map(row => row[1]).filter(quote => quote);

        // Select a random quote
        let quote = quotes[Math.floor(Math.random() * quotes.length)];

        // Sanitize the quote
        quote = quote.replace(/"/g, ''); // Remove all quotation marks

        return quote;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return 'An error occurred while fetching the quote.';
    }
}

document.addEventListener('DOMContentLoaded', async (event) => {
    const currentDate = new Date();
    const electionDate = new Date('2024-11-05T00:00:00'); // Election date in local time

    if (currentDate >= electionDate) {
        // Embed the video
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = `
            <iframe width="560" height="315" src="https://www.youtube.com/embed/jt6riM2aDLk?si=_WfQIVdj97cJDAA-&amp;start=18" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;
    } else {
        const date = currentDate.toISOString().slice(5, 10); // Get current date in MM-DD format
        let weeksUntilElection = calculateWeeksUntilElection(date);
        const currentDateStr = currentDate.toISOString().slice(2, 10);
        const electionDateStr = electionDate.toISOString().slice(2, 10);
        const diffTime = Math.abs(new Date(`20${electionDateStr}`) - new Date(`20${currentDateStr}`));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        if (diffDays % 7 === 0) {
            weeksUntilElection -= 1;
        }
        const daysUntilElection = calculateDaysUntilElection(currentDate, electionDate);
        const countdownElement = document.getElementById('countdown');
        const daysElement = document.getElementById('days');
        const moochesElement = document.getElementById('mooches');
        countdownElement.textContent = `${weeksUntilElection} week${weeksUntilElection !== 1 ? 's' : ''}`;
        daysElement.textContent = `${daysUntilElection} day${daysUntilElection !== 1 ? 's' : ''}`;

        function updateMooches() {
            const currentDateTime = new Date().toISOString();
            const moochesUntilElection = calculateMooches(currentDateTime);
            moochesElement.innerHTML = `${moochesUntilElection} Mooche${moochesUntilElection !== 1 ? 's' : ''}<sup style="font-size: 3vw;"><a href="https://theweek.com/speedreads/861881/anthony-scaramucci-measures-time-mooches" target="_blank" style="text-decoration: none;">*</a></sup>`;
        }

        updateMooches();
        setInterval(updateMooches, 1000);

        const quote = await fetchQuotes();
        const quoteElement = document.getElementById('quote');
        quoteElement.textContent = quote;
    }
});