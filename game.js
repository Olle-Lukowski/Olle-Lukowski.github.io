let money = 10;
let moneyText = document.createElement("p");
moneyText.innerHTML = "Money: $" + money;
document.body.appendChild(moneyText);
CreateResource("🪵", 1, 1);
CreateProducer("🌲", "🪵", 100);

function CreateResource(icon, price, multiplier) {
    let milestoneMultiplier = 2;
    let milestoneLevelReq = 10;
    let resourceMultiplier = multiplier;
    let resourceLevel = 0;
    let resource = 0;
    let resourcePrice = price;
    let resourceLevelText = document.createElement("p");
    resourceLevelText.className = icon + "level";
    resourceLevelText.innerHTML = "" + icon + " gatherer level: " + resourceLevel;
    document.body.appendChild(resourceLevelText);
    let resourceText = document.createElement("p");
    resourceText.className = icon + "amount";
    resourceText.innerHTML = "" + icon + " stored: " + resource;
    document.body.appendChild(resourceText);
    let resourceUpgradeButton = document.createElement("button");
    resourceUpgradeButton.className = icon + "upgrade";
    resourceUpgradeButton.innerHTML = "Upgrade " + icon + " (costs $" + (resourceMultiplier * 10) + ")";
    resourceUpgradeButton.addEventListener("click", function () {
        if (money >= (resourceMultiplier * 10)) {
            money -= (resourceMultiplier * 10);
            moneyText.innerHTML = "Money: $" + money;
            resourceLevel++;
            resourceLevelText.innerHTML = "" + icon + " gatherer level: " + resourceLevel;
            resourceUpgradeButton.innerHTML = "Upgrade " + icon + " (costs $" + (resourceMultiplier * 10) + ")";
        }
    });
    document.body.appendChild(resourceUpgradeButton);
    let sellresourceButton = document.createElement("button");
    sellresourceButton.className = icon + "sell";
    sellresourceButton.innerHTML = "Sell " + icon + " (earns $" + (resource * resourcePrice) + ")";
    sellresourceButton.addEventListener("click", function () {
        money += (resource * resourcePrice);
        moneyText.innerHTML = "Money: $" + money;
        resource = 0;
        resourceText.innerHTML = "" + icon + " stored: " + resource;
        sellresourceButton.innerHTML = "Sell " + icon + " (earns $" + (resource * resourcePrice) + ")";
    }
    );
    document.body.appendChild(sellresourceButton);
    setInterval(function () {
        resourceLevel = parseInt(resourceLevelText.innerHTML.split(" ")[3]);
        resource += resourceLevel;
        resourceText.innerHTML = "" + icon + " stored: " + resource;
        if (resourceLevel >= milestoneLevelReq) {
            resourceMultiplier *= milestoneMultiplier;
            resourceUpgradeButton.innerHTML = "Upgrade " + icon + " (costs $" + (resourceMultiplier * 10) + ")";
            milestoneLevelReq *= 2;
        }
        sellresourceButton.innerHTML = "Sell " + icon + " (earns $" + (resource * resourcePrice) + ")";
    },
        1000);
}

function CreateProducer(icon, baseResource, multiplier) {
    let milestoneMultiplier = 2;
    let milestoneLevelReq = 10;
    let producerMultiplier = multiplier;
    let producerLevel = 0;
    let producerLevelText = document.createElement("p");
    producerLevelText.innerHTML = "" + icon + " gatherer level: " + producerLevel;
    document.body.appendChild(producerLevelText);
    let producerUpgradeButton = document.createElement("button");
    producerUpgradeButton.innerHTML = "Upgrade " + icon + " (costs $" + (producerMultiplier * 10) + " and " + (producerMultiplier) + " " + baseResource + ")";
    producerUpgradeButton.addEventListener("click", function () {
        let resourceLevel = parseInt(document.getElementsByClassName(baseResource + "level")[0].innerHTML.split(" ")[3]);
        if (money >= (producerMultiplier * 10) && resourceLevel >= producerMultiplier) {
            money -= (producerMultiplier * 10);
            resourceLevel -= producerMultiplier;
            document.getElementsByClassName(baseResource + "level")[0].innerHTML = "" + baseResource + " gatherer level: " + resourceLevel;
            moneyText.innerHTML = "Money: $" + money;
            producerLevel++;
            producerLevelText.innerHTML = "" + icon + " gatherer level: " + producerLevel;
            producerUpgradeButton.innerHTML = "Upgrade " + icon + " (costs $" + (producerMultiplier * 10) + " and " + (producerMultiplier) + " " + baseResource + ")";
        }
    });
    document.body.appendChild(producerUpgradeButton);
    setInterval(function () {
        // find the base resource level text
        let baseResourceLevelText = document.getElementsByClassName(baseResource + "level")[0];
        // get the base resource level
        let baseResourceLevel = parseInt(baseResourceLevelText.innerHTML.split(" ")[3]);
        // increase the base resource level by the producer level
        baseResourceLevel += producerLevel;
        // update the base resource level text
        baseResourceLevelText.innerHTML = "" + baseResource + " gatherer level: " + baseResourceLevel;
        if (producerLevel >= milestoneLevelReq) {
            producerMultiplier *= milestoneMultiplier;
            producerUpgradeButton.innerHTML = "Upgrade " + icon + " (costs $" + (producerMultiplier * 10) + " and " + (producerMultiplier) + " " + baseResource + ")";
            milestoneLevelReq *= 2;
        }
    },
        1000);
}