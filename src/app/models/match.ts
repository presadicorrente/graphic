interface Match {
    team1: Team,
    team2: Team,
    period : number,
    timeRunning: boolean,
    seconds: number 
}

interface Team {
    name: string,
    score: number,
    color: string
}