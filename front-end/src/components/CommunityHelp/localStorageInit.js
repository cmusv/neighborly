export const initializeLocalStorage = () => {
    if (!localStorage.getItem("community-help-availabilities")) {
        localStorage.setItem(
            "community-help-availabilities",
            JSON.stringify([
                {
                    date: "11/29/2024",
                    time: "2pm-4pm",
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
                    time: "4pm-5pm",
                    category: "Home Facility",
                },
            ])
        );
    }
};
