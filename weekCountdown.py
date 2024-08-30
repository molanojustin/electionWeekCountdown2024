import datetime

def calculate_weeks_until_election(date):
    election_date = datetime.datetime(2024, 11, 5)  # Election day is November 5, 2024
    input_date = datetime.datetime.strptime(f"2024/{date}", "%Y/%m/%d")
    
    # Find the next Tuesday from the input date
    while input_date.weekday() != 0:  # 1 represents Tuesday (Monday is 0)
        input_date += datetime.timedelta(days=1)
    
    weeks_until_election = (election_date - input_date).days // 7 + 1
    return weeks_until_election

if __name__ == "__main__":
    date = input("Enter the date (MM/DD) or hit 'Enter' for the current date: ")
    if date == "":
        date = datetime.datetime.now().strftime("%m/%d")
    weeks_until_election = calculate_weeks_until_election(date)
    if weeks_until_election < 0:
        print("The inputted date is after the election.")
        exit()
    print(f"{weeks_until_election} weeks to go!")