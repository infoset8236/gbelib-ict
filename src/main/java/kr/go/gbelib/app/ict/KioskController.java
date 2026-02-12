package kr.go.gbelib.app.ict;

import kr.co.whalesoft.app.cms.homepage.Homepage;
import kr.co.whalesoft.app.cms.login.LoginService;
import kr.co.whalesoft.app.cms.member.Member;
import kr.co.whalesoft.app.common.api.IctAPI;
import kr.co.whalesoft.framework.base.BaseController;
import kr.co.whalesoft.framework.utils.JsonResponse;
import kr.go.gbelib.app.common.api.CommonAPI;
import kr.go.gbelib.app.common.api.LibSearchAPI;
import kr.go.gbelib.app.common.api.LoginAPI;
import kr.go.gbelib.app.intro.bookDescription.BookDescriptionService;
import kr.go.gbelib.app.intro.bookImage.BookImageService;
import kr.go.gbelib.app.intro.search.LibrarySearch;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = {"/{context_path}/ict/kiosk"})
public class KioskController extends BaseController {
    @Autowired
    private BookImageService bookImageService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private BookDescriptionService bookDescriptionService;

    public final static String ICT_TYPE = "/ict/type";
    public final static String KIOSK = "/kiosk/";

    private String basePath (HttpServletRequest request) {
        Homepage homepage = (Homepage) request.getAttribute("homepage");

        return ICT_TYPE + homepage.getKiosk_type() + KIOSK;
    }

    @RequestMapping(value = {"/{type}/index.*"})
    public String index (@PathVariable String context_path, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        return basePath(request) + type + "/index";
    }

    @RequestMapping(value = {"/{type}/info.*"})
    public String info (@PathVariable String context_path, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        return basePath(request) + type + "/info";
    }

    @RequestMapping(value = {"/{type}/notice.*"})
    public String notice (@PathVariable String context_path, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Homepage homepage = (Homepage) request.getAttribute("homepage");

        try {
            Map<String, Object> boardList = IctAPI.getNoticeList(homepage.getHomepage_id());

            if (boardList.get("noticeList") != null) {
                model.addAttribute("noticeList", boardList.get("noticeList"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return basePath(request) + type + "/notice";
    }

    @RequestMapping(value = {"/{type}/facility.*"})
    public String facility (@PathVariable String context_path, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        return basePath(request) + type + "/facility";
    }

    @RequestMapping(value = {"/{type}/login.*"})
    public String login (@PathVariable String context_path, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        return basePath(request) + type + "/login";
    }

    @RequestMapping(value = {"/{type}/rfidLogin.*"})
    public String rfidLogin (@PathVariable String context_path, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        return basePath(request) + type + "/rfidLogin";
    }

    @RequestMapping(value = {"/{type}/loginProc.*"})
    public @ResponseBody JsonResponse loginProc (Model model, @PathVariable String type, Member member, HttpServletRequest request, HttpServletResponse response, @PathVariable String context_path) throws Exception {
        JsonResponse res = new JsonResponse(request);

        Homepage homepage = (Homepage) request.getAttribute("homepage");
        request.removeAttribute("userIdLoginFail");

        Object result = LoginAPI.login(member);
        if (result instanceof Member) {
            try {
                member = (Member) result;
                member.setLogin(true);
                member.setLoginType("HOMEPAGE");

                res.setValid(true);
            } catch (Exception e) {
                res.setValid(false);
                res.setMessage(e.getMessage());
            }
            loginService.setSessionMember(member, request);
        } else {
            res.setValid(false);
            res.setMessage("아이디 또는 비밀번호를 다시 확인하세요.");
        }

        return res;
    }

    @RequestMapping(value = {"/{type}/rfidProc.*"})
    public @ResponseBody JsonResponse rfidProc (Model model, @PathVariable String type, Member member, HttpServletRequest request, HttpServletResponse response, @PathVariable("context_path") String context_path) throws Exception {
        JsonResponse res = new JsonResponse(request);

        Homepage homepage = (Homepage) request.getAttribute("homepage");
        request.removeAttribute("userIdLoginFail");

        member.setLoca(homepage.getHomepage_codeList()[0]);
        Object result = LoginAPI.rfidLogin(member);
        if (result instanceof Member) {
            try {
                member = (Member) result;
                member.setLogin(true);
                member.setLoginType("HOMEPAGE");

                res.setValid(true);
            } catch (Exception e) {
                res.setValid(false);
                res.setMessage(e.getMessage());
            }

            loginService.setSessionMember(member, request);
        } else {
            if (homepage.getHomepage_id().equals("h23")) {
                result = LoginAPI.barcodeLogin(member);
                if (result instanceof Member) {
                    try {
                        member = (Member) result;
                        member.setLogin(true);
                        member.setLoginType("HOMEPAGE");

                        res.setValid(true);
                    } catch (Exception e) {
                        res.setValid(false);
                        res.setMessage(e.getMessage());
                    }

                    loginService.setSessionMember(member, request);
                } else {
                    res.setValid(false);
                    res.setMessage("바코드 또는 RFID를 확인해주세요.");
                }
            } else {
                res.setValid(false);
                res.setMessage("아이디 또는 비밀번호를 다시 확인하세요.");
            }
        }

        return res;
    }

    @RequestMapping(value = "/{type}/logout.*")
    public String logout(@PathVariable String context_path, @PathVariable String type, HttpServletRequest request, RedirectAttributes redirectAttributes) {
        loginService.logout(request);

        return basePath(request) + type + "/index";
    }

    @RequestMapping(value = {"/{type}/newBook.*"})
    public String newBook (@PathVariable String context_path, LibrarySearch librarySearch, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Homepage homepage = (Homepage) request.getAttribute("homepage");

        if ( StringUtils.isEmpty(librarySearch.getSearch_start_date()) ) {
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

            if ("yc".equals(context_path)) {
                librarySearch.setSearch_start_date(sf.format(DateUtils.addDays(new Date(), -60)));
            } else {
                librarySearch.setSearch_start_date(sf.format(DateUtils.addDays(new Date(), -30)));
            }
            librarySearch.setSearch_end_date(sf.format(new Date()));
        }

        if (StringUtils.isEmpty(librarySearch.getvLoca())) {
            librarySearch.setvLoca(homepage.getHomepage_code());
        }

        librarySearch.setEndRowNum(24);

        Map<String, Object> result = null;

        try {
            result = bookImageService.resultImageMap(LibSearchAPI.getNewBookList(librarySearch, null),librarySearch, "dsNewBookList", "COVER_SMALLURL");

            List<Map<String, Object>> newBookList = (List<Map<String, Object>>) result.get("dsNewBookList");

            String content = "";

            if (newBookList != null && newBookList.size() > 0) {
                for (Map<String, Object> map : newBookList) {
                    if(StringUtils.isNotEmpty(map.get("ISBN").toString())) {
                        librarySearch.setSearch_type("isbn");
                        librarySearch.setSearch_text(map.get("ISBN").toString());
                        Map<String, Object> kakaoMap = LibSearchAPI.getKaKaoList(librarySearch);

                        List<Map<String, Object>> itemList = (List<Map<String, Object>>) kakaoMap.get("list");

                        if (itemList != null && itemList.size() > 0) {
                            for (Map<String, Object> map3 : itemList) {
                                content = String.valueOf(map3.get("contents"));
                            }

                            map.put("contentsDetail", content);
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("newBookList", result);
        model.addAttribute("librarySearch", librarySearch);

        return basePath(request) + type + "/newBook";
    }

    @RequestMapping(value = {"/{type}/bestBook.*"})
    public String bestBook (@PathVariable String context_path, LibrarySearch librarySearch, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Homepage homepage = (Homepage) request.getAttribute("homepage");

        if ( StringUtils.isEmpty(librarySearch.getSearch_start_date()) ) {
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

            librarySearch.setSearch_start_date(sf.format(DateUtils.addDays(new Date(), -30)));
            librarySearch.setSearch_end_date(sf.format(new Date()));
        }

        if (StringUtils.isEmpty(librarySearch.getvLoca())) {
            librarySearch.setvLoca(homepage.getHomepage_code());
        }

        Map<String, Object> bestBookResult = LibSearchAPI.getBestBookList(librarySearch);

        try {
            bestBookResult = bookImageService.resultImageMap(bestBookResult ,librarySearch, "dsLoanBestList", "COVER_SMALLURL");

            List<Map<String, Object>> bestBookList = (List<Map<String, Object>>) bestBookResult.get("dsLoanBestList");

            String content = "";

            if (bestBookList != null && bestBookList.size() > 0) {
                for (Map<String, Object> map : bestBookList) {
                    if(StringUtils.isNotEmpty(map.get("ISBN").toString())) {
                        librarySearch.setSearch_type("isbn");
                        librarySearch.setSearch_text(map.get("ISBN").toString());
                        Map<String, Object> kakaoMap = LibSearchAPI.getKaKaoList(librarySearch);

                        List<Map<String, Object>> itemList = (List<Map<String, Object>>) kakaoMap.get("list");

                        if (itemList != null && itemList.size() > 0) {
                            for (Map<String, Object> map3 : itemList) {
                                content = String.valueOf(map3.get("contents"));
                            }

                            map.put("contentsDetail", content);
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("bestBookList", bestBookResult);
        model.addAttribute("librarySearch", librarySearch);

        return basePath(request) + type + "/bestBook";
    }

    @RequestMapping(value = {"/{type}/detail.*"})
    public String detail (@PathVariable String context_path, @PathVariable String type, LibrarySearch librarySearch, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Homepage homepage = (Homepage) request.getAttribute("homepage");
        Map<String, Object> result = LibSearchAPI.getBookDetail(librarySearch);

        try {
            result = bookImageService.resultImageMap(result ,librarySearch, "dsItemDetail", "IMAGE_URL");
            bookDescriptionService.resultDescriptionMap(result, librarySearch, "dsItemDetail", "contentsDetail");
        }catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("detail", result);
        model.addAttribute("librarySearch", librarySearch);

        if(StringUtils.isEmpty(librarySearch.getSearch_end_date())) {
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
            if ("yc".equals(context_path)) {
                librarySearch.setSearch_start_date(sf.format(DateUtils.addDays(new Date(), -60)));
            } else {
                librarySearch.setSearch_start_date(sf.format(DateUtils.addDays(new Date(), -30)));
            }
            librarySearch.setSearch_end_date(sf.format(new Date()));
        }

        librarySearch.setEndRowNum(10);

        if (homepage.getHomepage_id().equals("h23")) {
            librarySearch.setvLoca("00147015");
        }

        Map<String, Object> newBookList = LibSearchAPI.getNewBookList(librarySearch, null);

        Map<String, Object> newBookResult = bookImageService.resultImageMap(newBookList, librarySearch, "dsNewBookList", "COVER_SMALLURL");
        bookDescriptionService.resultDescriptionMap(newBookResult, librarySearch, "dsNewBookList", "contentsDetail");

        model.addAttribute("newBookList", newBookResult);

        return basePath(request) + type + "/detail";
    }

    @RequestMapping(value = {"/{type}/librarian.*"})
    public String librarian (@PathVariable String context_path, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Homepage homepage = (Homepage) request.getAttribute("homepage");

        try {
            Map<String, Object> boardList = IctAPI.getBoardList(homepage.getHomepage_id());

            if (boardList.get("librarianRecommendList") != null) {
                model.addAttribute("librarianRecommendList", boardList.get("librarianRecommendList"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return basePath(request) + type + "/librarian";
    }

    @RequestMapping(value = {"/{type}/librarianDetail.*"})
    public String librarianDetail (@PathVariable String context_path, @PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        return basePath(request) + type + "/librarianDetail";
    }

    @RequestMapping(value = {"/{type}/ai.*"})
    public String ai(@PathVariable String context_path,@PathVariable String type, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return basePath(request) + type + "/ai";
    }

    @RequestMapping(value = {"/{type}/aiResult.*"})
    public String aiResult(LibrarySearch librarySearch, @PathVariable String type, @PathVariable String context_path, Model model, @RequestParam(value = "question", required = false) String question, HttpServletRequest request) {
        if (question == null) {
            question = "";
        }
        librarySearch.setSearch_text(question);

        model.addAttribute("searchText", question);
        return basePath(request) + type + "/aiResult";
    }

    @RequestMapping(value = {"/{type}/aiDetail.*"})
    public String aiDetail (@PathVariable String context_path, @PathVariable String type, LibrarySearch librarySearch, Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> result = LibSearchAPI.getBookDetail(librarySearch);

        try {
            result = bookImageService.resultImageMap(result ,librarySearch, "dsItemDetail", "IMAGE_URL");
            bookDescriptionService.resultDescriptionMap(result, librarySearch, "dsItemDetail", "contentsDetail");

            Map<String, Object> params = new HashMap<String, Object>();
            params.put("input", librarySearch.getSearch_text());
            params.put("isbn", librarySearch.getIsbn());

            String apiUrl = null;
            if (context_path.equals("yc")) {
                apiUrl = CommonAPI.YC_API_URL;
            } else if (context_path.equals("yy")) {
                apiUrl = CommonAPI.YY_API_URL;
            }
            Map<String, Object> aiResasonResult = CommonAPI.sendAiAPI("recommendation/reason", params, apiUrl);

            if (aiResasonResult != null) {
                String reason = aiResasonResult.get("recommend_reason").toString();
                result.put("reason", reason);
            }
        }catch (Exception e) {
            e.printStackTrace();
        }

        model.addAttribute("detail", result);
        model.addAttribute("librarySearch", librarySearch);

        return basePath(request) + type + "/aiDetail";
    }


}
