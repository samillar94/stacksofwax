function edit(id) {
    document.getElementById("V"+id).style.display = "none";
    document.getElementById("E"+id).style.display = "table-row";
}
function closeedit(id) {
    document.getElementById("V"+id).style.display = "table-row";
    document.getElementById("E"+id).style.display = "none";
}