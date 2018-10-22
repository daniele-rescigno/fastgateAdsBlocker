# fastgateAdsBlocker (EN)
Use parental control functionality of your FastGate in order to implement a simple advertising blocking server.

In this way all traffic that pass through the router will be filtered and, having added most of the biggest ADServer like Google, all of the device that are connected to fastgate (via ethernet or WiFi) will not display advertising.

This software add a limited list of ADServer (due to the fact that the fastgate was not designed to do this job) and cannot be compared to a real ADV blocking server or ADBlocker softwares.
However it is certainly an aid to the removal of many annoying advertisements.

# How to
Using the script is really simple, just follow this simple steps:

 1. Copy the entire code script from index.js file
 2. Open your favorite browser, I suggest you to use Chrome
 3. Open Developer Tools
	 - Chrome on Mac: press CMD + Option + J or open Settings, More tools and Developer tools
	 - Chrome on Windows: CMD + Shift + J
	 - Safari on Mac: press CMD + Option + C or open Develop menu and click on Show Javascript Console (be sure that you have Developer menu enabled; if not, goto Preferences, Advanced tab and Show develop menu in menu bar
	 - Edge on Windows: press F12
	 - Firefox on Mac: press CMD + Option + K or Tools, Web Developer, Web Console
	 - Firefox on Windows: CMD + Shift + K
 4. Paste the code into the console
 5. Start the script; choose if you want to delete the already present element inside the parental control list or start the script not taking into account the elements already present
	 - *fastgateAdsBlocker.start();* if you want to start adding items without removing those already present in the parental control list
	 - *fastgateAdsBlocker.start(**true**);* if you want to start adding items  removing those already present in the parental control list

If you need to stop the script execution, you can run *fastgateAdsBlocker.stop();*


# fastgateAdsBlocker (IT)
Usa la funzionalità del controllo parentale presente sul tuo FastGate di Fastweb per implementare un rapido server di blocco pubblicitario.

In questo modo tutto il traffico che passa dal router verrà filtrato e, avendo inserito gli AD server più conosciuti come quelli di Google, tutti i dispositivi connessi al fastgate (attraverso cavo ethernet o WiFi) non visualizzeranno annunci pubblicitari.

Questo script aggiunge una lista limitata (dovuto al fatto che il router fastgate non è stato sviluppato per fare questo lavoro) di AD server e non può essere confrontato a reali server di blocco pubblicitario o a plugin di blocco pubblicitario.
Tuttavia è sicuramente un aiuto alla rimozione di molti fastidiosi annunci pubblicitari.

# How to
L'utilizzo dello script è davvero semplice, basta seguire questi semplici step:

 1. Copia tutto il codice presente nel file index.js
 2. Apri il tuo browser preferito, io ti consiglio di utilizzare Chrome
 3. Apri i Developer Tools (strumenti per sviluppatori)
	 - Chrome per Mac: premi la combinazione CMD + Opzione + J oppure apri le Impostazioni, Impostazioni avanzate e Developer tools (Strumenti per gli sviluppatori)
	 - Chrome per Windows: premi la combinazione CMD + Shift + J
	 - Safari per Mac: premi la combinazione CMD + Opzione + C or apri il menu Sviluppatore e premi su Mostra console javascript (assicurati di aver abilitato il menu sviluppatori; se non lo hai fatto, vai in Preferenze, scheda Avanzate and Visualizza menu sviluppatori nella barra dei menu)
	 - Edge per Windows: premi F12
	 - Firefox per Mac: premi la combinazione CMD + Opzione + K or Strumenti, Sviluppo web, Web Console
	 - Firefox per Windows: CMD + Shift + K
 4. Incolla il codice copiato prima nella console
 5. Avvia lo script; scegli se vuoi cancellare le voci già presenti nell'elenco del controllo parentale o avviare lo script non tenendo in considerazione le voci già esistenti
	 - *fastgateAdsBlocker.start();* se vuoi avviare l'aggiunta degli elementi senza rimuovere quelli già presenti nella lista del controllo parentale
	 - *fastgateAdsBlocker.start(**true**);* se vuoi avviare l'aggiunta degli elementi rimuovendo quelli già presenti nella lista del controllo parentale

Se necessiti di stoppare l'esecuzione dello script, puoi farlo in qualsiasi momento incollando il comando *fastgateAdsBlocker.stop();* nella console.