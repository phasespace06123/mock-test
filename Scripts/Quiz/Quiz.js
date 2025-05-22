
$(document).ready(function () {
    page_load();
    page_click();
    page_change();
});
function page_load() {
    $(document).ready(function () {
        //if ($('#ExamID').val() == '14') {
        //    $('#drpLanguage').append($("<option></option>").text('Gujarati').val('3'));
        //}
        changeIndtruct($('#drpLanguage').find('option:selected').val(), 1);

    });
}

function changeIndtruct(q, flag) {
    $('#' + q).css("display", "block");
    if (q == '2') {
        $('#1').css("display", "none");
        $('#3').css("display", "none");
    } else if (q == '1') {
        $('#2').css("display", "none");
        $('#3').css("display", "none");
    } else if (q == '3') {
        $('#1').css("display", "none");
        $('#2').css("display", "none");
    }
    else {
        $('#2').css("display", "none");
        $('#3').css("display", "none");
    }

    if (q != undefined && flag != 0) {

        $.ajax({
            method: 'GET',
            async: false,
            url: $('#hdfBaseUrl').val() + 'Quiz/Home/Instructions_Lang',
            data: { 'LangID': q }
        }).done(function (data) {

            if ($('.ulInstruction> li:visible').length > 1) {
                $('.ulInstruction li:last-child').remove();
            }
            if (data != "") {
                $.each(JSON.parse(data['Instructions']), function (i, item) {
                    $('.ulInstruction').append('<li>' + item['Instruction'] + '</li>')
                });
            }
        }).error(function () {
            swal("Click ..", "Next");
        });

    }
    //Session["Instruction"]
}
function check_instruction(id) {
    if ($('#' + id + '_ch').prop("checked") == false) {
        if (id == '1') {
            swal({
                title: "Warning!",
                text: "Please accept terms and conditions before proceeding.",
                type: "warning",
                closeOnConfirm: true,
                confirmButtonText: "OK",
                confirmButtonClass: 'btn-primary',
                showLoaderOnConfirm: true,
            });
        } else if (id == '2') {
            swal({
                title: "चेतावनी!",
                text: "आगे बढ़ने से पहले नियम और शर्तें स्वीकार करें।",
                type: "warning",
                closeOnConfirm: true,
                confirmButtonText: "OK",
                confirmButtonClass: 'btn-primary',
                showLoaderOnConfirm: true,
            });
        } else if (id == '3') {
            swal({
                title: "ચેતવણી!",
                text: "આગળ વધતા પહેલાં નિયમો અને શરતો સ્વીકારો.",
                type: "warning",
                closeOnConfirm: true,
                confirmButtonText: "OK",
                confirmButtonClass: 'btn-primary',
                showLoaderOnConfirm: true,
            });
        }
    } else {
        window.location.href = "paper.html"//$('#hdfBaseUrl').val() + "Quiz/Home/Paper?Lng=" + $('#drpLanguage').find('option:selected').val();
    }
}
function page_click() {

    $(document).on('click', '#btnStart', function (e) {
        e.preventDefault();
        var frm = $('#frmexamtype');
        var frmParsley = frm.parsley();
        frmParsley.validate();
        if (!frm.parsley().isValid()) {
            return false;
        }
        var btn = $(this);
        btn.text('Processing...');
        window.location.href = $('#hdfBaseUrl').val() + 'Quiz/Home/Login?PaperID=' + $('#drpExamPaper').find('option:selected').val();
    });

    $(document).on('click', '#btnLogin', function (e) {
        e.preventDefault();
        window.location.href = 'instructions.html'//$('#hdfBaseUrl').val() + 'Quiz/Home/Instructions';
    });
    $(document).on('click', '#btnInstruction', function (e) {
        e.preventDefault();
        var id = $(this).val();
        check_instruction(id)
    });
}
function page_change() {
    //$("#drpLanguage").on('change', function (e) {
    //    e.preventDefault();


    //    //alert($(this).find('option: selected').val());
    //    if (papers.length == 0) { 
    //        fill_QuestionsGlobal(); 
    //    }

    //});
    $("#drpNatureofExam").on('change', function (e) {
        e.preventDefault();
        var ID = $(this).val();
        if (ID != "") {
            fill_paper($('#drpExamPaper'), ID);
        } else {
            $('#drpExamPaper').html = "";
        }
    });
}

function fill_paper(drp, ID) {
$.ajax({
    url: 'your-url-here',
    type: 'GET',
    dataType: 'json'
}).done(function (data) {
    drp.html("");
    drp.append("<option value=''>--Select--</option>");
    if (data['List'].length > 0) {
        $.each(data['List'], function (index, value) {
            var opt = "<option value='" + value['ID'] + "'>" + value['PaperName'] + "</option>";
            drp.append(opt);
        });
    }
}).fail(function () {
    // Suppressed popup
});

}
