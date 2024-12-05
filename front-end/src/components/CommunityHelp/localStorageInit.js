export const initializeLocalStorage = () => {
    if (!localStorage.getItem("community-help-availabilities")) {
        localStorage.setItem(
            "community-help-availabilities",
            JSON.stringify([
                {
                    date: "12/6/2024",
                    startTime: "17:00",
                    endTime: "19:00",
                    categories: ["Gardening", "Cleaning"],
                    helper: "Me",
                },
                {
                    date: "12/6/2024",
                    startTime: "17:00",
                    endTime: "18:00",
                    categories: ["Gardening", "Pet Care"],
                    helper: "Ruth",
                },
                {
                    date: "12/6/2024",
                    startTime: "14:00",
                    endTime: "16:00",
                    categories: ["Home Facility"],
                    helper: "Katie",
                },
                {
                    date: "12/6/2024",
                    startTime: "10:00",
                    endTime: "12:00",
                    categories: ["Tech", "Pet Care"],
                    helper: "Matt",
                },
            ])
        );
    }

    if (!localStorage.getItem("community-help-agenda")) {
        localStorage.setItem(
            "community-help-agenda",
            JSON.stringify([
                {
                    date: "12/6/2024",
                    task: "Being Helped",
                    owner: "Me",
                    helper: "Ruth",
                    startTime: "16:00",
                    endTime: "17:00",
                    category: ["Home Facility"],
                },
                {
                    date: "12/6/2024",
                    task: "Helping Others",
                    owner: "Cathy",
                    helper: "Me",
                    startTime: "19:00",
                    endTime: "19:30",
                    category: ["Gardening"],
                },
                {
                    date: "12/6/2024",
                    task: "Being Helped",
                    owner: "Me",
                    helper: "Alex",
                    startTime: "10:00",
                    endTime: "11:30",
                    category: ["Tech"],
                },
                {
                    date: "12/6/2024",
                    task: "Helping Others",
                    owner: "Elaine",
                    helper: "Me",
                    startTime: "08:00",
                    endTime: "09:00",
                    category: ["Pet Care"],
                },
            ])
        );
    }
};
