// From https://www.reddit.com/r/privacy/comments/3tz3ph/blocking_most_advertising_servers_via_factory/
var list = ["adsense.com", "adblade.com", "207.net", "247realmedia.com", "2mdn.net", "2o7.net", "33across.com", "abmr.net", "adbrite.com", "adbureau.net", "adchemy.com", "addthis.com", "addthisedge.com", "admeld.com", "admob.com", "adsonar.com", "advertising.com", "afy11.net", "aquantive.com", "atdmt.com", "atwola.com", "channelintelligence.com", "cmcore.com", "coremetrics.com", "crowdscience.com", "decdna.net", "decideinteractive.com", "doubleclick.com", "doubleclick.net", "esomniture.com", "fimserve.com", "flingwebads.com", "foxnetworks.com", "googleadservices.com", "googlesyndication.com", "google-analytics.com", "gravity.com", "hitbox.com", "imiclk.com", "imrworldwide.com", "insightexpress.com", "insightexpressai.com", "intellitxt.com", "invitemedia.com", "leadback.com", "lindwd.net", "mookie1.com", "myads.com", "netconversions.com", "nexac.com", "nextaction.net", "nielsen-online.com", "offermatica.com", "omniture.com", "omtrdc.net", "pm14.com", "quantcast.com", "quantserve.com", "realmedia.com", "revsci.net", "rightmedia.com", "rmxads.com", "ru4.com", "rubiconproject.com", "samsungadhub.com", "scorecardresearch.com", "sharethis.com", "shopthetv.com", "acoda.net", "targetingmarketplace.com", "themig.com", "trendnetcloud.com", "yieldmanager.com", "yieldmanager.net", "yldmgrimg.net", "youknowbest.com", "yumenetworks.com"];

list = list.filter((value, index, self) => {
    return self.indexOf(value) === index;
});

var fastgateAdsBlocker = (function () {
    var fgAdB = {},
        i = 0,
        proceed = true,
        // Useful to simulate an input into the input element in order to let angular validate value
        event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });

    /**
     * Index method
     */
    fgAdB.start = function (removeOld) {
        if (window.location.href.replace(window.location.origin, "").split("/")[2] == "advanced") {
            if (typeof removeOld !== 'undefined' && removeOld) {
                fgAdB.removeOldElements(function (data) {
                    if (data) {
                        removeOld = false;
                        fgAdB.addElements();
                    }
                })
            } else {
                fgAdB.addElements();
            }
        } else {
            window.location.href = window.location.origin + "/#/advanced";

            if (typeof removeOld !== 'undefined' && removeOld) {
                fgAdB.removeOldElements(function (data) {
                    if (data) {
                        removeOld = false;
                        fgAdB.addElements();
                    }
                })
            } else {
                fgAdB.addElements();
            }
        }
    };

    /**
     * Add element to parental control list
     */
    fgAdB.addElements = function () {
        if (i < list.length && proceed) {
            setTimeout(function () {
                if (document.querySelector('#parental_control button[ng-model="parental.parental_enabled"]').classList.contains("active")) {
                    document.querySelector('#parental_control button[ng-click="openParentalAddUrl()').click();

                    // Insert value into input
                    setTimeout(function () {
                        if (fgAdB.is_url(list[i])) {
                            document.querySelector('.modal-content input[ng-model="ctrl.url"]').value = list[i];

                            setTimeout(function () {
                                // Simulate an input in order to let angular to validate value
                                document.querySelector('.modal-content form[name="frm_add_parental_url"] input[ng-model="ctrl.url"]').dispatchEvent(event);

                                // Click on submit button
                                setTimeout(function () {
                                    document.querySelector('.modal-content form[name="frm_add_parental_url"] button[type="submit"]').click();

                                    console.log("fastgateAdsBlocker | added " + (i + 1) + "th item out of " + list.length + " (" + ((i + 1) / list.length * 100).toFixed(1) + "%)")

                                    // Let the time in order to close the popup
                                    setTimeout(function () {
                                        i++;
                                        fgAdB.addElements();
                                    }, 300);
                                }, 300);
                            }, 300);
                        } else {
                            i++;
                            fgAdB.addElements();
                        }
                    }, 500);
                } else {
                    document.querySelector('#parental_control button[ng-model="parental.parental_enabled"]').click();
                    i++;
                    fgAdB.addElements();
                }
            }, 500);
        } else if (i >= list.length && proceed) {
            document.querySelector('button[ng-click="updateParentalChanges()').click();

            const SAVINGCHECK = 500;
            var stillSaving = true,
                AVOIDLOOP = 20000 / SAVINGCHECK; // timeout useful to avoid infinite loop

            iterateCheckSaving();

            function iterateCheckSaving() {
                setTimeout(function () {
                    if (stillSaving && proceed && AVOIDLOOP >= 0) {
                        if (!document.querySelector('#parental_control div.panel.panel-body').classList.contains("loading-data")) {
                            stillSaving = false;

                            console.log("fastgateAdsBlocker | Software execution completed!");
                            alert("fastgateAdsBlocker | Software execution completed!");
                        } else {
                            AVOIDLOOP--;
                            iterateCheckSaving();
                        }
                    }
                }, SAVINGCHECK)
            }

        } else if (!proceed) {
            console.log("Program stopped by user");
        }
    };

    /**
     * Delete elements already present listed into the parental control list
     */
    fgAdB.removeOldElements = function (callback) {
        var elements = document.querySelectorAll('#parental_control table.table tr[ng-repeat="block in parental.blocks_list_uri"]'),
            i = 0;

        if (elements.length) {
            // At least one element, continue
            iterate();
        } else {
            // No any elements, return
            callback(true);
        }


        function iterate() {
            setTimeout(function () {
                elements[i].querySelector('td a[ng-click="deleteParentalUrl(block)"]').click();

                if (i < elements.length - 1) {
                    i++;
                    iterate();
                } else {
                    callback(true);
                }
            }, 250);
        }
    }

    /**
     * Check if url is valid
     */
    fgAdB.is_url = function (str) {
        // From https://gist.github.com/dperini/729294
        //regexp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        var re_weburl = new RegExp(
            "^" +
            // protocol identifier (optional)
            // short syntax // still required
            //"(?:(?:(?:https?|ftp):)?\\/\\/)" +
            // user:pass BasicAuth (optional)
            "(?:\\S+(?::\\S*)?@)?" +
            "(?:" +
            // IP address exclusion
            // private & local networks
            "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
            "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
            "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
            "|" +
            // host & domain names, may end with dot
            // can be replaced by a shortest alternative
            // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
            "(?:" +
            "(?:" +
            "[a-z0-9\\u00a1-\\uffff]" +
            "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
            ")?" +
            "[a-z0-9\\u00a1-\\uffff]\\." +
            ")+" +
            // TLD identifier name, may end with dot
            "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
            ")" +
            // port number (optional)
            "(?::\\d{2,5})?" +
            // resource path (optional)
            "(?:[/?#]\\S*)?" +
            "$", "i"
        );
        if (re_weburl.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    fgAdB.stop = function () {
        proceed = false;
    }

    return fgAdB;
}());

// If you want to only add newly adserver domain, use the following command
// fastgateAdsBlocker.start();

// If you want to remove all adserver already present into your fastgate and then adding new adservers, use the following command
// fastgateAdsBlocker.start(true);

// If you need to stop the code execution, use the following command
// fastgateAdsBlocker.stop();
