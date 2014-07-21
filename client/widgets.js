

var TextBlob = function() {
    var title


}

a = TextBlob();
b = TextBlob();

TextBlob.prototype.name = function() {
    return "TextBlob";
}

TextBlob.prototype.render = function() {
    return "<textarea></textarea>";
}

TextBlob.prototype.onClick = function() {
    alert("clicked");
}