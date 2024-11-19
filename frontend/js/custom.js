$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var base_url = $('#base_url').val();
var cur = $('#currency').val();
$(document).ready(function () {

    var url = $(location).attr('href');
    var fn = url.split('/').reverse()[1];
    if (fn == "checkout") {
        count_total();
    }


    $(".select2").select2();

    if ($($('#date')).length) {
        $('#date').flatpickr({
            minDate: "today",
            dateFormat: "Y-m-d",
        });
    }

    var proQty = $('.pro-qty');
    var price = $('#ticket_price').val();
    var tax_total = $('#tax_total').val();

    var total = 0;
    proQty.on('click', '.qtybtn', function () {
        var newVal = 0;
        var $button = $(this);
        var currency_code = $('#currency_code').val();
        var tpo = parseFloat($('#tpo').val());
        var available = parseFloat($('#available').val());
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            if (oldValue < tpo && oldValue < available) {
                newVal = parseFloat(oldValue) + 1;
            }
            else {
                newVal = oldValue;
            }
        } else {
            if (oldValue > 1) {
                newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find('input').val(newVal);
        $('.event-middle .qty').html(newVal);
        count_total();

    });


    $("#coupon_btn").click(function () {
        let coupon = $("#coupon_code");
        let coupon_val = coupon.val();
        let coupon_btn = $("#coupon_btn");

        if (coupon_val == "") {
            Swal.fire({
                icon: 'error',
                text: "Please enter the coupon code first"
            })
        } else {
            check_coupon(coupon_val);
        }
    });


    $(".btn-bio").click(function () {
        $('.bio-control').show(1000);
    });

    $(".bio-control").focusout(function () {
        var bio = this.value;
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: "POST",
            url: base_url + '/add-bio',
            data: {
                bio: bio,
            },
            success: function (result) {
                if (result.success == true) {
                    $('.bio-section').html('<p class="detail-bio">' + bio + '</p>');
                }
            },
            error: function (err) {
                console.log('err ', err)
            }
        });
    });

    $('#OpenImgUpload').click(function () {
        $('#imgUpload').trigger('click');
    });
    $("#imgUpload").change(function () {
        readURL(this);
    });


    $(".event-data").click(function () {
        $('.event-data').removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr('id').split('-')[1];
        $.ajax({
            type: "GET",
            url: base_url + '/getOrder/' + id,
            success: function (result) {
                if (result.success == true) {

                    code = result.data.currency;
                    currency = getSymbol(code);

                    if (result.data.event.type == "online") { var type = "Online Event"; }
                    else { var type = result.data.event.address; }
                    if (result.data.order_status == "Pending") {
                        var status = 'badge-warning';
                    }
                    else if (result.data.order_status == "Complete") {
                        var status = 'badge-success';
                    }
                    else if (result.data.order_status == "Cancel") {
                        var status = 'badge-danger';
                    }
                    if (result.data.payment_status == 1) {
                        var payment_status_class = 'badge-success';
                        var payment_status = 'Paid';
                    }
                    if (result.data.payment_status == 0) {
                        var payment_status_class = 'badge-warning';
                        var payment_status = 'Waiting';
                    }
                    if (result.data.review == null && result.data.order_status == "Complete" || result.data.order_status == "Cancel") {
                        var review_content = '<div><button class="btn open-addReview"  data-toggle="modal" data-id="' + result.data.id + '" data-order="' + result.data.order_id + '"  data-target="#reviewModel"><i class="fa fa-star"></i></button><p>Review</p></div>';
                    }
                    else {
                        var review_content = '';
                    }
                    if (result.data.review != null) {
                        var review_content = '';
                    }
                    var rating = result.data.review != null ? '<div class="rating order-rate"></div>' : ''

                    var payment_token = result.data.payment_token == null ? '-' : result.data.payment_token;

                    $('.single-order').html('<div class="single-order-top"></div><div class="order-bottom"></div>')
                    $('.single-order-top').append('<p class="text-light mb-0">' + result.data.order_id + '</p><h2>'
                        + result.data.time + '</h2><span class="badge ' + status + '">' + result.data.order_status + '</span>'
                        + rating + '<div class="row mt-2"><div class="col-lg-2"><img class="w-100" src="' + base_url + '/images/upload/' + result.data.event.image + '">\
                </div><div class="col-5"><h6 class="mb-0">'
                        + result.data.event.name + '</h6><p class="mb-0">By: ' + result.data.organization.first_name + ' ' + result.data.organization.last_name +
                        '</p><p class="mb-0">' + result.data.start_time + ' to </p><p class="mb-0">' + result.data.end_time + '</p><p class="mb-0">'
                        + type + '</p></div><div class="col-5 "> <div class="right-data text-center"><div><button class="btn" onclick="viewPayment()"><i class="fa fa-credit-card"></i></button><p>Payment</p></div>' + review_content + '<div>\
                <a class="btn" target="_blank" href="'+ base_url + '/order-invoice-print/' + result.data.id + '"><i class="fa fa-print"></i></a><p>Print</p></div> </div><div class="payment-data hide" ><p class="mb-0"><span>Payment Method : </span>' + result.data.payment_type + '</p><p class="mb-1"><span>Payment Token : </span>' + payment_token + '</p><span class="badge ' + payment_status_class + '">' + payment_status + '</span></div></div></div>');

                    if (result.data.ticket.type == "free") {
                        $('.order-bottom').append('<div class="order-ticket-detail mb-4"><div><p>' + result.data.ticket.name + '</p></div><div> ' + result.data.quantity + ' tickets</div></div><div class="order-total"> <p>Ticket Price</p><p> FREE</p></div><div class="order-total"> <p>Coupon discount</p><p> 0.00</p></div><div class="order-total"><p>Tax</p><p> 0.00</p></div><div class="order-total"> <h6>Total</h6><h6>FREE</h6></div>');
                    }
                    else {
                        $('.order-bottom').append('<div class="order-ticket-detail mb-4"><div><p>' + result.data.ticket.name + '</p></div><div> ' + result.data.quantity + ' * ' + result.data.ticket.price + '</div></div><div class="order-total"> <p>Ticket Price</p><p> ' + currency + (result.data.ticket.price * result.data.quantity) + '</p></div><div class="order-total"> <p>Coupon discount</p><p>(-) ' + result.data.coupon_discount + '</p></div><div class="order-total"><p>Tax</p><p>(+) ' + result.data.tax + '</p></div><div class="order-total"> <h6>Total</h6><h6>' + result.data.payment + '</h6></div>');
                    }
                    if (result.data.review != null) {
                        for (i = 1; i <= 5; i++) {
                            var active = result.data.review.rate >= i ? 'active' : '';
                            $('.single-order-top .order-rate').append('<i class="fa fa-star ' + active + ' mr-1"></i>');
                        }
                    }
                }
                viewPayment();
            },
            error: function (err) {
                console.log('err ', err)
            }
        });
    });

    $(".chip-button").click(function () {
        var type = $(this).attr('id').split('-')[0];
        var id = $(this).attr('id').split('-')[1];
        window.location.replace(base_url + '/all-events');
    });

    $("#duration").change(function () {
        if (this.value == "date") {
            $('.date-section').removeClass('hide');
            $('.date-section').addClass('show');
        }
    });

    $(document).on("click", ".open-addReview", function () {
        var id = $(this).data('id');
        var myBookId = $(this).data('order');
        $(".modal-body #order_id").val(id);
        $('#exampleModalLongTitle').html('Add Review to ' + myBookId);

    });


    $(".payments input[type=radio][name=payment_type] ").change(function () {
        $('#paypal-button-container').html('');
        $('.paypal-button-section').hide();
    /* if(this.value=="STRIPE"){
        $('#payment').val(parseFloat($('#total_sum').html()));

        var pay = $('#stripe_payment').val();
        var cur_code = $('#currency_code').val();

        $('#form_submit').hide();

        $('.stripe-form-section').show();

        $('.stripe-form').show();

        $('.stripe-form').html('<script src="https://checkout.stripe.com/checkout.js" class="btn-primary stripe-button" data-key= '+$("#stripePublicKey").val()+' data-amount='+pay+' data-name="abc" data-description="nothing" data-image = "https://stripe.com/img/documentation/checkout/marketplace.png" data-locale="auto" data-currency="'+cur_code+'" ></script>');
    }
    else */ if (this.value == "PAYPAL") {
            $('#form_submit').attr('disabled', true);
            value = parseFloat($('#total_sum').html());
            $('#payment').val(parseFloat(value));
            paypal.Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: value
                            }
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        $('#payment_token').val(details.id);
                        $('#form_submit').attr('disabled', false);
                        $('#checkout').submit();
                    });
                }
            }).render('#paypal-button-container');

            $('.paypal-button-section').show(500);
        }
        else if (this.value == "RAZOR") {
            $('#get_currency').val('USD');
            $('#form_submit').attr('disabled', true);
            $('#payment').val(parseFloat($('#total_sum').html()));
            var options = {
                key: $('#razor_key').val(),
                amount: parseFloat($('#total_sum').val()) * 100,
                name: 'CodesCompanion',
                description: 'test',
                image: 'https://i.imgur.com/n5tjHFD.png',
                handler: demoSuccessHandler
            }
            window.r = new Razorpay(options);
            r.open();
        } else {

            $('#payment').val(parseFloat($('#total_sum').html()));

            $('#form_submit').attr('disabled', false);
        }
    });

    $('#imageUploadForm').submit(function (e) {
        e.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            type: 'POST',
            url: base_url + '/upload-profile-image',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                if (result) {
                    $('#profileDropdown .header-profile-img').attr('src', base_url + '/images/upload/' + result.data);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    });



});



function addFavorite(id, type) {
    $.ajax({
        type: "GET",
        url: base_url + '/add-favorite/' + id + '/' + type,
        success: function (result) {
            if (result.success == true) {
                Swal.fire({
                    icon: 'success',
                    text: result.msg
                })
                setTimeout(() => {
                    window.location.reload();
                }, 800);
            }
        },
        error: function (err) {
            console.log('err ', err)
        }
    });
}
function demoSuccessHandler(transaction) {
    $('#payment_token').val(transaction.razorpay_payment_id)
    $('#form_submit').attr('disabled', false);
}

function viewPayment() {
    $('.payment-data').slideToggle();
}

function addRate(id) {
    $('.rating i').css('color', '#d2d2d2');
    $('#reviewModel input[name="rate"]').val(id);
    for (let i = 1; i <= id; i++) {
        $('.rating #rate-' + i).css('color', '#fec009');
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
    $("#imageUploadForm").submit();
}

function follow(id) {
    $.ajax({
        type: "GET",
        url: base_url + '/add-followList/' + id,
        success: function (result) {
            if (result.success == true) {
                Swal.fire({
                    icon: 'success',
                    text: result.msg
                })
                setTimeout(() => {
                    window.location.reload();
                }, 800);
            }
        },
        error: function (err) {
            console.log('err ', err)
        }
    });
}

function count_total() {
    price = parseFloat($('#ticket_price').val());
    tax_total = parseFloat($('#tax_total').val());
    newVal = parseFloat($("#newVal").val());
    discount = parseFloat($("#total_discount").html());
    currency_code = $('#currency_code').val();

    ticket_price = parseFloat(newVal * price);
    tax = parseFloat(newVal * tax_total);
    discount_val = parseFloat(((ticket_price) * discount) / 100);
    total_sum = ticket_price + tax - discount_val;

    $("#total_ticket_price").html(ticket_price.toFixed(2));
    $("#total_discount").html(discount);
    $("#total_discount_val").html(discount_val.toFixed(2));
    $("#total_tax").html(tax);
    $("#total_sum").html(total_sum.toFixed(2));

    $("#payment").val(total_sum.toFixed(2));
    $("#coupon_discount").val(discount_val);

    total = total_sum;
    if (currency_code == 'USD' || currency_code == 'EUR') {
        total = total_sum * 100;
    }
    $('#stripe_payment').val(total);
    /*     if($('input[name=payment_type]').val()=="STRIPE")
        {
            var pay = $('#stripe_payment').val();
            $('#form_submit').hide();
            $('.stripe-form-section').show();
            $('.stripe-form').show();
            $('.stripe-form').html('<script src="https://checkout.stripe.com/checkout.js" class="btn-primary stripe-button" data-key= '+$("#stripePublicKey").val()+' data-amount='+pay+' data-name="abc" data-description="nothing" data-image = "https://stripe.com/img/documentation/checkout/marketplace.png" data-locale="auto" data-currency="USD" ></script>');
        } */

}




function check_coupon(coupon_code) {
    let ticket_id = $("#ticket_id").val();
    let coupon = $("#coupon_code");
    let coupon_btn = $("#coupon_btn");
    $.ajax({
        type: "GET",
        url: base_url + '/check-coupon/' + ticket_id + '/' + coupon_code,
        success: function (result) {
            if (result.success == true) {
                Swal.fire({
                    icon: result.type,
                    text: result.message
                })

            }
            if (result.type == "success") {

                coupon.attr("readonly");
                coupon_btn.css("color", "black");
                coupon_btn.removeAttr('id');
                $('#total_discount').html(parseFloat(result.discount));
                $('#coupon_id').val(result.id);
            } else {
                coupon.val("");
            }
            count_total();

        },
        error: function (err) {
            console.log('err ', err)
        }
    });
}


function getSymbol(code) {

    $result = $.ajax({
        type: "GET",
        async: false,
        url: base_url + '/get-symbol/' + code,
        success: function (result) {
            currency = result.symbol;


            if ($("#currency_symbol").length > 0) {
                $('#currency_symbol').val(currency);
            } else {
                $('body').append('<input type="hidden" id="currency_symbol" name="currency_symbol" value="' + currency + '">');
            }

        },
        error: function (err) {
            console.log('err ', err)
        }
    });

    $result.done(function () {
    })
    return $("#currency_symbol").val();



}

