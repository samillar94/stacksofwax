function edit(id) {
    document.getElementById("tdVB"+id).style.display = "none";
    document.getElementById("tdVC"+id).style.display = "none";
    document.getElementById("tdEB"+id).style.display = "table-cell";
    document.getElementById("trEC"+id).style.display = "table-row";
}
function closeedit(id) {
    document.getElementById("tdVB"+id).style.display = "table-cell";
    document.getElementById("tdVC"+id).style.display = "table-cell";
    document.getElementById("tdEB"+id).style.display = "none";
    document.getElementById("trEC"+id).style.display = "none";
}