import $, { speed } from "jquery";
import gsap from "gsap";
import Swiper, {
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
  Navigation,
} from "swiper";
import axios from "axios";

// const API = "https://imaego-api.odinflux.com";
const API = "http://localhost:8011";

Swiper.use([Mousewheel, Pagination, Keyboard, Autoplay, Navigation]);

var isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window["safari"] ||
      (typeof safari !== "undefined" && window["safari"].pushNotification)
  );
var isChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
// //console.log(iOS);
if (iOS && $(window).width() < 990) {
  $(".loader").css("display", "grid");
  $(".loading-text").css("display", "none");
  $(".progress").css("display", "none");
}
if (isSafari) {
  // $("#wrapper").css("display","none");
  // $(".progress").css("display","none")
  // $(".loading-text").css("display","none")
  // $('.hero-video').get(0).play();
  // // document.body.style.minHeight="100vh"
  // $("#imgbox").css({"display":"none"})
  // $("#main").css({})
  // var main=document.getElementById("main")
  // var mainlogo=document.getElementById("mainlogo")
  // var verticaltext=document.getElementById("verticaltext")
  // main.style.opacity=1;
  // mainlogo.style.opacity=1;
  // verticaltext.style.opacity=1;
}
var width = 100,
  perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
  EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
  time = parseInt((EstimatedTime / 1000) % 60) * 100;
var obj = perfData;
// //console.log(performance.getEntriesByType("navigation")[0].domComplete);

// Loadbar Animation
$(".progress-value").animate(
  {
    width: width + "%",
  },
  time
);
// //console.log(time);
// Percentage Increment Animation
var PercentageID = $("#percentage"),
  start = 0,
  end = 100,
  durataion = time;
animateValue(PercentageID, start, end, durataion);

function animateValue(id, start, end, duration) {
  var range = end - start,
    current = start,
    increment = end > start ? 1 : -1,
    stepTime = Math.abs(Math.floor(duration / range)),
    obj = $(id);

  var timer = setInterval(function () {
    current += increment;
    $(obj).text("Loading(" + current + "%)");
    //obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
      $(".scrollArrow").css("opacity", 1);
      $(".progress").css("opacity", 0);
      $(".loading-text").css("opacity", 0);
    }
  }, stepTime);
}
// $(document).ready(function(){
//     $('.hero-video').get(0).pause()
// })
if ($(window).width() < 990) {
  $("#wrapper").css("display", "none");
  // $(".progress").css("display","none")
  // $(".loading-text").css("display","none")
}
window.onresize = function (event) {
  window.location.reload();
};
window.addEventListener("load", (e) => {
  //console.log("All Loaded")
  // //console.log(perfData.loadEventEnd);
});
// //console.log(document.body.style.minHeight);
$(window).on("load", function () {
  //console.log("All set!!!")
  loadVideo();
  // loadTalentSlider();
  if ($(window).width() > 990) {
    $(window).scroll(function () {
      var logo = document.getElementById("logo");
      var imgbox = document.getElementById("imgbox");
      var main = document.getElementById("main");
      var mainlogo = document.getElementById("mainlogo");
      var verticaltext = document.getElementById("verticaltext");
      //console.log( $(this).scrollTop()/100);
      if ($(this).scrollTop() > 1)
        $("#logo").css({
          transform: "scale(" + $(this).scrollTop() / 100 + ")",
        });

      if ($(this).scrollTop() / 10 > 15) {
        $(".hero-video").get(0).play();
        document.body.style.minHeight = "100vh";
        $("#imgbox").css({ opacity: "0" });
        $(".hlogo").css({ display: "block" });
        $(".vertical-title").css({ display: "block" });
        imgbox.style.display = "none";
        main.style.opacity = 1;
        mainlogo.style.opacity = 1;
        verticaltext.style.opacity = 1;
        //console.log(document.body.style.minHeight);
        // $(".scalelogo").css({"transform": "scale(1)"})
      } else {
        $("#imgbox").css({ opacity: "1" });
        $(".hlogo").css({ display: "none" });
        $(".vertical-title").css({ display: "none" });
      }
    });
  } else {
    $(".loader").css("opacity", "0");

    $("#wrapper").css("display", "none");
    //    $(".progress").css("display","none")
    var logo = document.getElementById("logo");
    var imgbox = document.getElementById("imgbox");
    var main = document.getElementById("main");
    var mainlogo = document.getElementById("mainlogo");
    var verticaltext = document.getElementById("verticaltext");
    setTimeout(() => {
      logo.style.transform = "scale(0.6)";
      imgbox.style.opacity = 0;
    }, 1000);
    setTimeout(() => {
      imgbox.style.display = "none";
      $(".loader").css("display", "none");
      main.style.opacity = 1;
      mainlogo.style.opacity = 1;
      verticaltext.style.opacity = 1;
    }, 1500);
    setTimeout(() => {
      $(".hero-video").get(0).play();
    }, 2000);
  }
});
$(function () {
  const params = new URLSearchParams(window.location.search);

  //console.log('ready')

  $("[data-home-slide]").each(function (i) {
    $(this).attr("data-home-slide", i);
  });

  let mainSwiper = new Swiper(".swiper-container.home", {
    direction: "vertical",
    speed: 1000,
    slidesPerView: 1,
    height: window.innerHeight,
    mousewheel: true,
    keyboard: {
      enabled: true,
      // onlyInViewport: true
    },
    pagination: {
      el: "header nav ul.pages",
      clickable: true,
      renderBullet: (index, className) => {
        var slide = $(`[data-home-slide="${index}"]`);
        return `<li data-menu-id="${index}" class="${className}">${slide.data(
          "html"
        )}</li>`;
      },
    },
    on: {
      afterInit: (e) => {
        setTimeout(() => {
          setActiveBar(e.activeIndex);
        }, 100);
      },
      slideChange: (e) => {
        setActiveBar(e.activeIndex);
        if (e.activeIndex > 0) {
          $(".hero-video").get(0).pause();
        } else {
          $(".hero-video").get(0).play();
        }
      },
    },
    freeMode: true,
    breakpoints: {
      // when window width is >= 768px
      768: {
        freeMode: false,
        allowTouchMove: false,
        slidesPerView: 1,
      },
    },
  });

  // mainSwiper.slideTo(3)

  $(".hero-video").on("click", function () {
    // const video = $(this).get(0)
    // if (video.paused) video.play()
    // else video.pause()
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    const formData = {
      full_name: this.full_name.value,
      email: this.email.value,
      comment: this.comment.value,
    };
    let valid = true;

    if (formData.full_name == "") {
      $("#full_name-error").show();
    } else {
      $("#full_name-error").hide();
    }

    if (formData.email == "") {
      $("#email-error").show();
    } else {
      $("#email-error").hide();
    }

    if (formData.full_name == "" || formData.email == "") valid = false;

    if (!valid) return false;

    //console.log(formData)
    $.ajax({
      type: "POST",
      url: "/email.php",
      data: formData,
      success: function (res) {
        //console.log(res)
        $("#contactForm").trigger("reset");
        $("#contactForm .message").css("display", "flex");
        setTimeout(() => {
          $("#contactForm .message").hide();
        }, 3000);
      },
      error: function (error) {
        //console.log(error)
      },
    });
  });
  $(".gotoContact").on("click", function () {
    mainSwiper.slideTo(6);
  });

  $(".hamburger").on("click", function () {
    openSideMenu();
  });
  $(".closeHamburger").on("click", function () {
    closeSideMenu();
  });

  // Api Calling
  axios
    .get(API + "/talent/getTalent")
    .then((res) => {
      if (!res.data.error) {
        // console.log(res.data.details.data);

        if (res.data.details.data.length > 0) {
          if (params.has("id")) {
            res.data.details.data
              .sort((a, b) => a.sequence - b.sequence)
              .map((k) => {
                if (k.id == params.get("id")) {
                  console.log(params.get("id"));
                  $("title").html(`${k.author} | Talent | imaego`);
                  $("#title").html(`${k.author.toUpperCase()}`);
                  $("#mtitle").html(`${k.author}`);
                  $("#oneliner").html(`${k.oneliner}`);
                  $("#content").html(k.content.replace(/&nbsp;/gi, " "));
                  $("#bannerImage").attr(
                    "src",
                    k.relations.filter((e) => e.type == "bannerImage")[0].image
                      .key
                  );
                  // $("#footerImage1 img").attr("src",k.relations.filter(e=>e.type == "footer1")[0].image.key)
                  // $("#footerImage2 img").attr("src",k.relations.filter(e=>e.type == "footer2")[0].image.key)
                  // $("#footerImage3 img").attr("src",k.relations.filter(e=>e.type == "footer3")[0].image.key)
                  k.socials.map((e) => {
                    if (e.value !== "") {
                      const icon =
                        e.type.toLowerCase() == "instagram"
                          ? "im--instagram"
                          : e.type.toLowerCase() == "youtube"
                          ? "im--play"
                          : e.type.toLowerCase() == "website"
                          ? "im--sphere"
                          : "im--sphere";
                      const s = `<div class="socialHandles">
                        <li>
                            <a href="${e.value}" target="_blank">
                                <i class=${icon}> </i>
                            </a>
                        </li>
                        <a class="handlesLink" href="${e.value}"  target="_blank">
                            <p class="handles">
                                ${e.handle}
                            </p>
                        </a>
                    </div>
                    `;
                      console.log(s);
                      $("#socialsD").append(s);
                    }
                  });
                  k.relations
                    .filter((e) => e.type != "bannerImage" && e.type != "video")
                    .map((j, i) => {
                      // console.log(j,i)
                      $("#footerImages").append(`
                            <div class="image" id="footerImage${i + 1}">
                                <img src="${
                                  k.relations.filter(
                                    (e) => e.type == `footer${i + 1}`
                                  )[0].image.key
                                }" />
                            </div>
                        `);
                      if (i < 2) {
                        $("#footerMImages").append(`
                            <div class="image" id="footerImage${i + 1}">
                                <img src="${
                                  k.relations.filter(
                                    (e) => e.type == `footer${i + 1}`
                                  )[0].image.key
                                }" />
                            </div>
                        `);
                      } else {
                        $("#footerMBigImages").append(`
                            <div class="image fullImage" id="footerImage${
                              i + 1
                            }">
                                <img src="${
                                  k.relations.filter(
                                    (e) => e.type == `footer${i + 1}`
                                  )[0].image.key
                                }" />
                            </div>
                        `);
                      }
                    });
                }
              });
          }
          // talentSwiper.destroy(false)

          res.data.details.data
            .sort((a, b) => a.sequence - b.sequence)
            .map((k, i) =>
              k.relations
                .filter((e) => e.type == "video")
                .map((e, j) => {
                  console.log(e, i, j);
                  if (params.has("id")) {
                  } else {
                    $(".talentSwiper").append(`<div class="swiper-slide">
                <a class="box" href="/talent/talent.html?id=${k.id}">
                    <video preload="auto" playsinline muted>
                        <source src='${e.image.key}' type="video/mp4" />
                    </video>
                </a>
            </div>`);
                    //     talentSwiper.appendSlide(`
                    // <div class="swiper-slide">
                    //     <a class="box" href="/talent/talent.html?id=${k.id}">
                    //         <video preload="auto" playsinline muted>
                    //             <source src='${e.image.key}' type="video/mp4" />
                    //         </video>
                    //     </a>
                    // </div>
                    // `)
                    // // console.log(talentSwiper)
                    // talentSwiper.updateSlidesClasses()
                    // if(i==0) talentSwiper.removeSlide(0)

                    // talentSwiper.updateSlidesClasses()
                  }
                })
            );
          console.log("done adding", $(".talentSwiper"));
          const talentSwiper = new Swiper(".talent-slider", {
            speed: 400,
            slidesPerView: "auto",
            spaceBetween: 0,
            observer: true,
            autoplay: {
              delay: 2000,
              pauseOnMouseEnter: true,
            },
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
          $(".talent-slider video").on("mouseenter", function () {
            $(this).get(0).play();
          });
          $(".talent-slider video").on("mouseleave", function () {
            $(this).get(0).pause();
            $(this).get(0).currentTime = 0;
          });
          $(".talent-slider video").each(function () {
            const video = $(this).get(0);
            var playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.then((_) => {
                video.pause();
                video.currentTime = 0;
              });
            }
          });
        }
      }
    })
    .catch((e) => console.log(e));

  axios
    .get(API + "/blog/getBlog")
    .then((res) => {
      if (!res.data.error) {
        if (res.data.details.data.length > 0) {
          res.data.details.data
            .sort((a, b) => a.sequence - b.sequence)
            .map((e, i) => {
              if (params.has("id")) {
                if (e.id == params.get("id")) {
                  // console.log(e)
                  $("title").html(`${e.title} | Insight | imaego`);
                  $("#title").html(`${e.title.toUpperCase()}`);
                  $("#mtitle").html(`${e.title}`);
                  $("#bannerImg").attr("src", e.relations[0].image.key);
                  $("#Incontent").html(e.content);

                  if (e.title.length > 17) {
                    $("#title").css("font-size", "9em");
                    $("#mtitle").css("font-size", "4em");
                  }
                }
              } else {
                if (i == 0) {
                  // $("#firstBlog").css("background-image",`url(${e.relations[0].image.key})`)
                  // $("#firstBlog h4").html(e.title)
                  // console.log(e.relations[0].image.key,"blog image",$("#firstBlog"));
                  $("#insights").append(
                    `<div
                            class="box border--fat"
                            style="
                              background-image: url('${
                                e.relations.length > 0
                                  ? e.relations[0].image.key
                                  : ""
                              }');
                            "
                          >
                            <h4 class="teko">${e.title}</h4>
                            <a class="plus--link" href="insight/insight.html?id=${
                              e.id
                            }"
                              ><i class="im--cross"></i><span>READ MORE</span></a
                            >
                          </div>`
                  );
                } else {
                  $("#insights").append(
                    `
                            <div class="box">
                                <div class="img-content">
                                    <img src="${
                                      e.relations.length > 0
                                        ? e.relations[0].image.key
                                        : ""
                                    }" />
                                </div>
                                <div class="content">
                                    <p>
                                    ${e.title}
                                    </p>
                                    <a class="plus--link dark" href="insight/insight.html?id=${
                                      e.id
                                    }">
                                        <i class="im--cross"></i>
                                        <span>READ MORE</span>
                                    </a>
                                </div>
                            </div>
                            `
                  );
                }
              }
              // console.log(e,"blog");
            });
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });

  var images = [
    "Journey1.jpg",
    "Journey2.jpg",
    "Journey3.jpg",
    "Journey4.jpg",
    "Journey5.jpg",
  ];
  var text = [
    "...and an opportunity in the world of social media. Benefitting from these rapid changes takes experience and effort. We act as your ear to the ground and engine room, allowing you to do what you do best while we help shape your brand and achieve more.",
    "...for you to tell. To discover. To do. And there’s never been a better time to explore your personal interests and passions. So how do we help share your truth?",
    "...is in its imperfections. We want the real. The honest. The meaningful, credible and the authentic. We’re about creating lasting partnerships and telling stories that matter.",
    "...and that’s no passing trend. The bar is being raised and average just doesn’t cut it anymore. Why? It’s not valuable. Not to you, not to your following. Quality comes through sharing authentic, truthful stories of who you are.",
    "...we know it, and you probably do too, but that doesn’t make it easy. Creating content that cuts through the noise should appear effortless. But, we know it's not. So let’s make the most of the opportunity that change has provided us.",
  ];
  var titles = [
    "Change is a constant",
    "There’s so much more",
    "The beauty of truth",
    "Quality matters",
    "The world wants the real you",
  ];
  var i = 0;
  $(".journey--container").css(
    "background-image",
    "url(../assets/images/" + images[i] + ")"
  );
  for (let index = 0; index < images.length; index++) {
    $("#" + index).css(
      "background-image",
      "url(../assets/images/" + images[index] + ")"
    );
  }
  var journeyTimer = setInterval(() => {
    i++;
    if (i == images.length) {
      i = 0;
    }
    for (let index = 0; index < images.length; index++) {
      if (index == i) {
        //console.log(index,"selected", i);
        $("#" + index).addClass("selected");
      } else {
        $("#" + index).removeClass("selected");
      }
    }

    $(".journey--container").fadeOut("slow", function () {
      $(".selectedNumber").html(parseInt(i) + 1);
      $(".journey--text").html(text[i]);
      $(".selectedTitle").html(titles[i]);
      $(this).css(
        "background-image",
        "url(../assets/images/" + images[i] + ")"
      );
      $(this).fadeIn("slow");
    });
  }, 8000);
  $(".tab").on("click", (e) => {
    i = e.currentTarget.id;
    for (let index = 0; index < images.length; index++) {
      if (index == i) {
        //console.log(index,"selected", i);
        $("#" + index).addClass("selected");
      } else {
        $("#" + index).removeClass("selected");
      }
    }
    $(".journey--container").fadeOut("slow", function () {
      $(".selectedNumber").html(parseInt(i) + 1);
      $(".journey--text").html(text[i]);
      $(".selectedTitle").html(titles[i]);
      $(this).css(
        "background-image",
        "url(../assets/images/" + images[i] + ")"
      );
      $(this).fadeIn("slow");
      clearInterval(journeyTimer);
      journeyTimer = setInterval(() => {
        i++;
        if (i == images.length) {
          i = 0;
        }
        for (let index = 0; index < images.length; index++) {
          if (index == i) {
            //console.log(index,"selected", i);
            $("#" + index).addClass("selected");
          } else {
            $("#" + index).removeClass("selected");
          }
        }

        $(".journey--container").fadeOut("slow", function () {
          $(".selectedNumber").html(parseInt(i) + 1);
          $(".journey--text").html(text[i]);
          $(".selectedTitle").html(titles[i]);
          $(this).css(
            "background-image",
            "url(../assets/images/" + images[i] + ")"
          );
          $(this).fadeIn("slow");
        });
      }, 8000);
    });
  });

  if (params.has("key")) {
    $("#imgbox").css("display", "none");
    $("#main").css("opacity", "1");
    $("#mainlogo").css("opacity", "1");
    $("#verticaltext").css("opacity", "1");
    // //console.log("swiper");
    mainSwiper.slideTo(params.get("key"), 2000);

    //     var imgbox=document.getElementById("imgbox")
    //     imgbox.style.display="none";
    //     var main=document.getElementById("main")
    // var mainlogo=document.getElementById("mainlogo")
    // var verticaltext=document.getElementById("verticaltext")

    //     main.style.opacity=1;
    //     mainlogo.style.opacity=1;
    //     verticaltext.style.opacity=1;
  }
});
/* ---------- document ready end ---------- */

const loadVideo = () => {
  axios
    .get("https://imaego-api.odinflux.com/homepage/active")
    .then((e) => {
      const data = e.data;
      if (data?.details?.homepage?.image?.key) {
        // console.log(data?.details?.homepage?.image?.key,"dgyg");
        $(".home--container").html(
          `<video class="hero-video" playsinline=""  preload="auto" controls="" muted=""><source src="${data?.details?.homepage?.image?.key}" type="video/mp4"></video>`
        );
      }
    })
    .catch((e) => {
      // console.log(e);
      $(".home--container").html(
        `<video class="hero-video" playsinline=""  preload="auto" controls="" muted=""><source src="/assets/videos/video.mp4" type="video/mp4"></video>`
      );
    });
};
// const loadTalentSlider = ()=>{
//     let talentVideos = ["/assets/videos/talent-chris.mp4","/assets/videos/talent-mariafe.mp4","/assets/videos/talent-max.mp4","/assets/videos/talent-priscilla.mp4","/assets/videos/talent-tom.mp4","/assets/videos/talent-ryan.mp4",]
//     let talentLinks=["chris-knight.html","mariafe.html","max-woodward.html","priscilla-hon.html","tom-mitchell.html","ryan-tongia.html"];
//     let html="";
//     let i=0;
//     for(i = 0;i<6;i++){
//         html +=`<div class="swiper-slide"><a class="box" href="/talent/${talentLinks[i]}"><video preload="auto" playsinline muted><source src="${talentVideos[i]}" type="video/mp4" /></video></a></div>`
//     }
//     //console.log(html);
//     $(".talentSwiper").html(html)

// }
const setActiveBar = (i) => {
  gsap.to(".active-bar", {
    x: 0,
    rotation: 0,
    y:
      $(`[data-menu-id="${i}"]`).offset().top +
      $(`[data-menu-id="${i}"]`).height() / 2.5,
    width: $(`[data-menu-id="${i}"]`).width() + 50,
    height: $(`[data-menu-id="${i}"]`).height() / 1.5,
    duration: 0.3,
  });
  closeSideMenu();
};

const openSideMenu = () => {
  gsap.to("header nav", {
    x: 0,
  });
};

const closeSideMenu = () => {
  gsap.to("header nav", {
    x: window.innerWidth <= 786 ? $(window).width() * 1.5 : 0,
  });
};
