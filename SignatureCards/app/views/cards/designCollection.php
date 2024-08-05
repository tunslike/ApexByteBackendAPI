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
        <h1>OUR DESIGN COLLECTION</h1>
    </div>
</div>

<div class="collection-area">

    <div class="left-categories">
        <h1>Browse Categories</h1>
        <ul>
            <li><a href="#">Best Selling</a></li>
            <li><a href="#">New Designs</a></li>
            <li><a href="#">Corporate Designs</a></li>
            <li><a href="#">Luxury Designs</a></li>
            <li><a href="#">Personalized Designs</a></li>

        </ul>
    </div>

    <div class="right-collection-area">
        
        <a class="design-card" href="#">
            <h1>Personal Card</h1>
            <img src="<?php echo URLROOT; ?>/public/img/cards/card_7.png" />
            <div class="design-details">
                <h5>From ₦35,000</h5>
            </div>
        </a>
        <a class="design-card" href="#">
            <h1>Hustle Card</h1>
            <img src="<?php echo URLROOT; ?>/public/img/cards/card_1.png" />
            <div class="design-details">
                <h5>From ₦55,000</h5>
            </div>
        </a>
        <a class="design-card" href="#">
            <h1>Hustle Card</h1>
            <img src="<?php echo URLROOT; ?>/public/img/cards/card_1.png" />
            <div class="design-details">
                <h5>From ₦55,000</h5>
            </div>
        </a>
        <a class="design-card" href="#">
            <h1>Personal Card</h1>
            <img src="<?php echo URLROOT; ?>/public/img/cards/card_7.png" />
            <div class="design-details">
                <h5>From ₦35,000</h5>
            </div>
        </a>
        <a class="design-card" href="#">
            <h1>Hustle Card</h1>
            <img src="<?php echo URLROOT; ?>/public/img/cards/card_1.png" />
            <div class="design-details">
                <h5>From ₦55,000</h5>
            </div>
        </a>
        <a class="design-card" href="#">
            <h1>Hustle Card</h1>
            <img src="<?php echo URLROOT; ?>/public/img/cards/card_1.png" />
            <div class="design-details">
                <h5>From ₦55,000</h5>
            </div>
        </a>
    </div>

</div>

<?php
   require APPROOT . '/views/includes/footer.php';
?>