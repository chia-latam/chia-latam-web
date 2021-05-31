/*
 notifyMe jQuery Plugin v1.0.0
 Copyright (c)2014 Sergey Serafimovich
 Licensed under The MIT License.
*/
(function(e) {
    e.fn.notifyMe = function(t) {
        var r = e(this);
        var i = e(this).find("input[name=email]");
        var n = e(this).find("input[name=name]");
        var pool = e(this).find("input[name=pool]");
        var x = e(this).find("select[name=size]");
        
        var s = e(this).attr("action");
        var o = e(this).find(".note");
        e(this).on("submit", function(t) {
            t.preventDefault();
            var h = i.val();
            var p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (n.val().length < 5) {
                $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                $(".message").addClass("bad-email").removeClass("success-full");
                $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                $(".message").html('<p class="notify-valid">Completa con un nombre o nickname válido.</p>').fadeIn();
                o.hide();
                return false;
            }
            console.log({
                email: h,
                name: n,
                pool: pool.val(),
                size: x.val()
            });
            if (p.test(h)) {
                $(".message").removeClass("error bad-email success-full");
                $(".message").hide().html('').fadeIn();
                $(".fa-spinner").addClass("fa-spin").removeClass("opacity-0");
                o.show();
                e.ajax({
                    type: "POST",
                    url: s,
                    data: {
                        email: h,
                        name: n.val(),
                        pool: pool.val(),
                        size: x.val()
                    },
                    dataType: "json",
                    error: function(e) {
                        o.hide();
                        $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                        $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                        if (e.status == 404) {
                            $(".message").html('<p class="notify-valid">El servicio no se encuentra disponible.<br>Por favor volver a intentar en unos minutos.</p>').fadeIn();
                        } else {
                            $(".message").html('<p class="notify-valid">Oops. Parece que algo salio mal.<br>Por favor volver a intentar más tarde.</p>').fadeIn();
                        }
                    }
                }).done(function(e) {
                    o.hide();
                    if (e.status == "success") {
                        $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                        $(".message").removeClass("bad-email").addClass("success-full");
                        $(".block-message").addClass("show-block-valid").removeClass("show-block-error");
                        $(".message").html('<p class="notify-valid">¡Bienvenido! Ya estas pre-registrado.<br>Te estaremos avisando pronto.</p>').fadeIn();
                    } else {
                        if (e.type == "ValidationError") {
                            $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                            $(".message").html('<p class="notify-valid">Parece que tu cuena de correo no es válida.<br>Por favor proba con otra cuenta.</p>').fadeIn();
                        } else {
                            $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                            $(".message").html('<p class="notify-valid">Oops. Parece que algo salio mal.<br>Por favor volver a intentar más tarde.</p>').fadeIn();
                        }
                    }
                })
            } else {
                $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
                $(".message").addClass("bad-email").removeClass("success-full");
                $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
                $(".message").html('<p class="notify-valid">Revisa tu correo. No es una dirección válida.</p>').fadeIn();
                o.hide();
            }

            // Reset and hide all messages on .keyup()
            $("#notifyMe input").keyup(function() {
                $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
                $(".message").fadeOut();
            });
        })
    }

    

})(jQuery)