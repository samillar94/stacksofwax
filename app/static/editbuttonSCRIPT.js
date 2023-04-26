/// Profile edit toggle
function editM() {
    document.getElementById("MdivVD").style.display = "none";
    document.getElementById("MdivED").style.display = "block";
}
function closeM() {
    document.getElementById("MdivVD").style.display = "block";
    document.getElementById("MdivED").style.display = "none";
}
/// Copy edit toggle
function editC(id) {
    document.getElementById("CtdVB"+id).style.display = "none";
    document.getElementById("CtdVC"+id).style.display = "none";
    document.getElementById("CtdEB"+id).style.display = "table-cell";
    document.getElementById("CtdEC"+id).style.display = "table-cell";
    document.getElementById("CtrEJ"+id).style.display = "table-row";
}
function closeC(id) {
    document.getElementById("CtdVB"+id).style.display = "table-cell";
    document.getElementById("CtdVC"+id).style.display = "table-cell";
    document.getElementById("CtdEB"+id).style.display = "none";
    document.getElementById("CtdEC"+id).style.display = "none";
    document.getElementById("CtrEJ"+id).style.display = "none";
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
function closeJ(id) {
    document.getElementById("JtdVB"+id).style.display = "table-cell";
    document.getElementById("JtdVC"+id).style.display = "table-cell";
    document.getElementById("JtdVN"+id).style.display = "table-cell";
    document.getElementById("JtdEB"+id).style.display = "none";
    document.getElementById("JtdEC"+id).style.display = "none";
    document.getElementById("JtdEN"+id).style.display = "none";
}