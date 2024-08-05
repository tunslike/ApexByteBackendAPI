<?php
   require APPROOT . '/views/includes/header.php';
?>

<div class="header-area">
    <?php
    require APPROOT . '/views/includes/menu.php';
    ?>
</div>
<div class="inner-sub-header">
    <div class="inner-sub-body">
        <h1>REGULAR KRAFT BUSINESS CARDS</h1>
    </div>
</div>

<div class="inner-card-body">
    <div class="left-column">
        <div class="img-box">
            <div id="card_image_bg" class="image-card">
              <span id="card_text" class="card-name"></span>
            </div>
        </div>
        <div class="description">
            <div class="desc-header">
                <h1>Description</h1>
            </div>
            <div class="description-body">
                <p>
                Our brown kraft business cards have a natural texture and rustic appearance. This regular kraft is available with an 18pt thickness, perfect for everyday cards, bulk cards at a trade show, or to ensure you can fit more into your travel card case. With 2 sides of offset printing already included in the price, virtually any color can be applied to suit your branding – even across the full face of the card with negative text left showing as the natural tone of the paper! For rustic charm, earth-positive ambiance, or an economic choice, the Regular Brown Kraft’s versatility will be sure to enhance your branding. Order yours from RockDesign today!
                </p>
            </div>
        </div>

        <div class="description">
            <div class="desc-header">
                <h1>How to Order</h1>
            </div>
            <div class="description-body">
                <p>
                8 - 11 business days after proof approval + transit*

*Please inform our orders department if you have any upcoming specific deadlines even if the day is outside of our regular turn-around time. This allows us to proceed accordingly if there are any production delays.
*Turn around time varies based on job complexity and size. Please feel free to contact us with any questions you may have.
                </p>
            </div>
        </div>
    </div>
    <div class="right-column">
        <h1>REGULAR KRAFT BUSINESS CARDS</h1>
        <h3>₦ 25,000</h3>
        <h5>Quantity</h5>
        <div class="quantity_counter">
            <span id="minusCounter" onClick="quantityCount('minus');" class="counter">-</span>
            <span id="data_counter" data-counter="1" class="reader">1</span>
            <span id="addCounter" onClick="quantityCount('add');" class="counter">+</span>
        </div>
        <br>
        <h5>Select Card Color</h5>
        <div class="card-color-list">
            <a onclick="changeImageBG('black');" class="tooltip">
                <img src="<?php echo URLROOT; ?>/public/img/template/template_01.png"/>
                <span class="tooltiptext">Black Card</span>
            </a>
            <a onclick="changeImageBG('gold');" class="tooltip">
                <img src="<?php echo URLROOT; ?>/public/img/template/template_02.png"/>
                <span class="tooltiptext">Gold Card</span>
            </a>
            <a onclick="changeImageBG('red');" class="tooltip">
                <img src="<?php echo URLROOT; ?>/public/img/template/template_03.png"/>
                <span class="tooltiptext">Red Card</span>
            </a>
            <a onclick="changeImageBG('white');" class="tooltip">
                <img src="<?php echo URLROOT; ?>/public/img/template/template_04.png"/>
                <span class="tooltiptext">White Card</span>
            </a>
        </div>

        <h5 style="margin-top:30px;">Enter Name</h5>
        <input type="text" class="txtName" id="card_txt_id" placeholder="Enter your name">

        <div class="payment-button">
            <input class="add-cart" type="button" value="Add to Cart">
            <input class="pay-button" type="button" value="Pay Now">
        </div>
       
    </div>
</div>

<div class="like-product">
    <h1>You may also like</h1>
    <div class="like-product-list">
        <a class="like-product" href="<?php echo URLROOT.'/cards/cardDesign' ?>">
        <h1>Gucci Style</h1>
        <img src="<?php echo URLROOT; ?>/public/img/cards/card_3.png" />
    </a>
    </div>
</div>

<?php
   require APPROOT . '/views/includes/footer.php';
?>