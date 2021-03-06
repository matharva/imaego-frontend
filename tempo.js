const fs = require("fs");

const data = `
Fig. 4 shows the architectural design of Docker containerbased big data processing system (including 3 Managers and 2
Workers) on multiple Docker supported clouds [8]. In Docker
Swarm, the manager is responsible for the entire cluster and
manages the resources of multiple Docker hosts at scale [16].
Managers are responsible for orchestrating the cluster, serving
the Service API, scheduling tasks (containers) and addressing
containers that have failed health checks [17]. A primary
manager (leader) is the main point of contact within the
Docker Swarm cluster. In Docker Swarm, there could be one
primary manager (leader) and multiple secondary managers
(reachable managers) in case the primary manager fails [16].
Primary manager works as a leader of the system and all
the secondary managers contact with it regarding services and
information. It is also possible to talk to secondary managers
(replica instances) that will act as backups. However, all
requests issued on a secondary manager are automatically
proxied to the primary manager. If the primary manager fails, a
secondary manager takes away the lead. Therefore, it facilitates
a highly available and reliable cluster [16]. Worker nodes
serve only simpler functions such as executing the tasks to
spawn containers and routing data traffic intended for specific
containers [17]. 
`;
const splitData = data.split("\n");

console.log(splitData);

let textWithoutSpaces = "";
splitData.forEach((item, index) => (textWithoutSpaces += item + " "));

const fiveSentenceText = textWithoutSpaces.split(". ");
console.log(fiveSentenceText);

// console.log(finalText);
const NUM_OF_SENTENCES = 5;

let finalText = "";
fiveSentenceText.forEach((item, index) => {
  finalText += item + ". ";
});

fs.writeFileSync("./output.txt", finalText, "utf-8");
