const generateQS = (object: any): string => {
    let vals = []
    for (const key in object) {
        if (object[key] != "") {
            vals.push(key + "=" + object[key])
        }
    }
    return vals.join("&")
}

const stripHTML = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '');
}

const generateUrlFriendlyID = (id: string): string => {
    if (id === undefined) return ''
    return id.split("/").join("_")
}

const generateGurdienIDFromUrlId = (id: string): string => {
    if (id === undefined) return ''
    return id.split("_").join("/")
}

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

export { generateQS, stripHTML, generateUrlFriendlyID, generateGurdienIDFromUrlId, isMobile }