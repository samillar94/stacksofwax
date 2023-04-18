/// Copy edit toggle
function editC(id) {
    document.getElementById("CtdVB"+id).style.display = "none";
    document.getElementById("CtdVC"+id).style.display = "none";
    document.getElementById("CtdEB"+id).style.display = "table-cell";
    document.getElementById("CtrEC"+id).style.display = "table-row";
}
function closeeditC(id) {
    document.getElementById("CtdVB"+id).style.display = "table-cell";
    document.getElementById("CtdVC"+id).style.display = "table-cell";
    document.getElementById("CtdEB"+id).style.display = "none";
    document.getElementById("CtrEC"+id).style.display = "none";
}
/// Jukebox edit toggle
function editJ(id) {
    document.getElementById("JtdVB"+id).style.display = "none";
    document.getElementById("JtdVC"+id).style.display = "none";
    document.getElementById("JtdVN"+id).style.display = "none";
    document.getElementById("JtdEB"+id).style.display = "table-cell";
    document.getElementById("JtdEC"+id).style.display = "table-cell";
    document.getElementById("JtdEN"+id).style.display = "table-cell";
}
function closeeditJ(id) {
    document.getElementById("JtdVB"+id).style.display = "table-cell";
    document.getElementById("JtdVC"+id).style.display = "table-cell";
    document.getElementById("JtdVN"+id).style.display = "table-cell";
    document.getElementById("JtdEB"+id).style.display = "none";
    document.getElementById("JtdEC"+id).style.display = "none";
    document.getElementById("JtdEN"+id).style.display = "none";
}