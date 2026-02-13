jQuery(function ($) {
  const $infoList = $(".infoList");
  const $items = $infoList.children(".infoItem");

  const groupSize = 3;

  for (let i = 0; i < $items.length; i += groupSize) {
    $items
        .slice(i, i + groupSize)
        .wrapAll('<div class="infoGroup"></div>');
  }

  const $groups = $infoList.children(".infoGroup");
  const totalItems = $items.length;

  $infoList.slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
    dots: false,
    infinite: $groups.length > 1,
    centerMode: false,
    variableWidth: false
  });

  const $current = $(".panelCurrent");
  const $total   = $(".panelTotal");

  $total.text("/" + totalItems);

  function updateCount(currentSlide) {
    const slidesToShow = $infoList.slick("getSlick").options.slidesToShow;
    const visibleEnd = currentSlide + slidesToShow; 

    let count = 0;
    $infoList
            .find(".infoGroup")
            .slice(0, visibleEnd)
            .each(function () {
              count += $(this).find(".infoItem").length;
            });

    $current.text(Math.min(count, totalItems));
  }

  updateCount(0);

  $infoList.on("afterChange", function (event, slick, currentSlide) {
    updateCount(currentSlide);
  });
});