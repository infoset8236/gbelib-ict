package kr.co.whalesoft.app.common.api;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;

public class IctAPI {
    protected final static Logger log = LoggerFactory.getLogger(IctAPI.class);

    public final static String HOMEPAGE_API_URL = ResourceBundle.getBundle("api").getString("ict.api.url");

    public static HttpURLConnection initConn(String urlStr) throws Exception {
        URL url = new URL(urlStr);

        HttpURLConnection connection = null;
        connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Accept-Charset", "UTF-8");
        connection.setRequestProperty("Accept-Language", "utf-8,ko;q=0.8,en-us;q=0.5,en;q=0.3");
        connection.setDoOutput(true);
        connection.setConnectTimeout(10000);
        connection.setReadTimeout(10000);
        return connection;
    }

    public static Map<String, Object> sendAPI(String requestName, Map<String, Object> param) {
        HttpURLConnection connection = null;
        Map<String, Object> resultMap = null;

        try {
            // 1. 파라미터를 쿼리스트링으로 변환
            StringBuilder paramBuilder = new StringBuilder();
            if (param != null && !param.isEmpty()) {
                for (Iterator<String> it = param.keySet().iterator(); it.hasNext();) {
                    String key = it.next();
                    String value = param.get(key) == null ? "" : param.get(key).toString();
                    paramBuilder.append(URLEncoder.encode(key, "UTF-8"));
                    paramBuilder.append("=");
                    paramBuilder.append(URLEncoder.encode(value, "UTF-8"));
                    if (it.hasNext()) {
                        paramBuilder.append("&");
                    }
                }
            }

            // 2. GET URL 생성
            String apiUrl = HOMEPAGE_API_URL + requestName;
            if (paramBuilder.length() > 0) {
                apiUrl += "?" + paramBuilder.toString();
            }

            log.info("@@@@@@@@@@@@@@@@@@ HOMEPAGE_API_URL : " + apiUrl);

            // 3. 연결 (initConn 조건 그대로)
            connection = initConn(apiUrl);
            connection.setRequestMethod("GET"); // GET으로 전환

            // 4. 결과 읽기
            InputStream is = connection.getInputStream();
            String result = IOUtils.toString(is, "UTF-8").trim();
            is.close();

            // 5. JSON 파싱
            ObjectMapper om = new ObjectMapper();
            resultMap = om.readValue(result, new TypeReference<Map<String, Object>>() {});

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }

        return resultMap;
    }

    @RequestMapping(value = {"/boardList.*"})
    public static Map<String, Object> getBoardList(String homepage_id) {
        Map<String, Object> params = new HashMap<String, Object>();

        putIfNotEmpty(params, "homepage_id", homepage_id);

        return sendAPI("boardList.do", params);
    }

    @RequestMapping(value = {"/noticeList.*"})
    public static Map<String, Object> getNoticeList(String homepage_id) {
        Map<String, Object> params = new HashMap<String, Object>();

        putIfNotEmpty(params, "homepage_id", homepage_id);

        return sendAPI("noticeList.do", params);
    }

    @RequestMapping(value = {"/eventList.*"})
    public static Map<String, Object> getEventList(String homepage_id) {
        Map<String, Object> params = new HashMap<String, Object>();

        putIfNotEmpty(params, "homepage_id", homepage_id);

        return sendAPI("eventList.do", params);
    }

    @RequestMapping(value = {"/guestbook.*"})
    public static Map<String, Object> getGuestbook(String homepage_id) {
        Map<String, Object> params = new HashMap<String, Object>();

        putIfNotEmpty(params, "homepage_id", homepage_id);

        return sendAPI("guestbook.do", params);
    }

    @RequestMapping(value = {"/guestbookSave.*"})
    public static Map<String, Object> getGuestbookSave(String homepage_id, String user_name, String content) {
        Map<String, Object> params = new HashMap<String, Object>();

        putIfNotEmpty(params, "homepage_id", homepage_id);
        putIfNotEmpty(params, "user_name", user_name);
        putIfNotEmpty(params, "content", content);

        return sendAPI("guestbookSave.do", params);
    }

    @RequestMapping(value = {"/news.*"})
    public static Map<String, Object> getNews() {
        Map<String, Object> params = new HashMap<String, Object>();

        return sendAPI("news.do", params);
    }

    private static void putIfNotEmpty(Map<String, Object> params, String key, String value, boolean stripDash) {
        if (StringUtils.isNotEmpty(value)) {
            params.put(key, stripDash ? value.replaceAll("-", "") : value);
        }
    }

    private static void putIfNotEmpty(Map<String, Object> params, String key, String value) {
        putIfNotEmpty(params, key, value, false);
    }
}
