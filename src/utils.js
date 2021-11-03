export const utils = {
  primerLetra(text) {
    var acentos = "QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnm";
    var original = "QWERTYUIOPASDFGHJKLÑZXCVBNMQWERTYUIOPASDFGHJKLÑZXCVBNM";
    for (var i = 0; i < acentos.length; i++) {
      text = text.replace(new RegExp(acentos.charAt(i), 'g'), original.charAt(i));
    }
    return text;
  },
}
