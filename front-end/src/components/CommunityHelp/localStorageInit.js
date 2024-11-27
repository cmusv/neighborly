export const initializeLocalStorage = () => {
    if (!localStorage.getItem("community-help-availabilities")) {
        localStorage.setItem(
            "community-help-availabilities",
            JSON.stringify([
                {
                    date: "11/29/2024",
                    startTime: "08:00",
                    endTime: "10:00",
                    duration: "2 hrs",
                    categories: ["Gardening", "Cleaning"],
                    helper: "Amy",
                },
            ])
        );
    }

    if (!localStorage.getItem("community-help-agenda")) {
        localStorage.setItem(
            "community-help-agenda",
            JSON.stringify([
                {
                    date: "11/29/2024",
                    task: "Being Helped",
                    owner: "Me",
                    helper: "Ruth",
                    startTime: "16:00",
                    endTime: "17:00",
                    category: "Home Facility",
                },
                {
                    date: "11/29/2024",
                    task: "Helping Others",
                    owner: "Cathy",
                    helper: "Me",
                    startTime: "19:00",
                    endTime: "19:30",
                    category: "Gardening",
                },
                {
                    date: "11/29/2024",
                    task: "Being Helped",
                    owner: "Me",
                    helper: "Alex",
                    startTime: "10:00",
                    endTime: "11:30",
                    category: "Tech",
                },
                {
                    date: "11/29/2024",
                    task: "Helping Others",
                    owner: "Elaine",
                    helper: "Me",
                    startTime: "08:00",
                    endTime: "09:00",
                    category: "Pet Care",
                },
            ])
        );
    }
};
