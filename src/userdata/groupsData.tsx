export type Group = {
    id: number,
    title: string,
    image: typeof Image,
    labels: Array<String>,
    currentPlayers: number,
    maxPlayers: number,
    description: string,
}

const groupsData = {
    groups: [
        {
            id: 1,
            title: "Gaming Group",
            image: "",
            labels: ["Causal", "Fun"],
            currentPlayers: 4,
            maxPlayers: 6,
            description: "A group of gamers",
        }
    ],
};

export default groupsData;