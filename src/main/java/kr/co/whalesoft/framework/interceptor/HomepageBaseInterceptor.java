package kr.co.whalesoft.framework.interceptor;

import java.io.InputStreamReader;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.co.whalesoft.app.cms.homepage.Homepage;

public class HomepageBaseInterceptor extends HandlerInterceptorAdapter {

	protected final Logger log = LoggerFactory.getLogger(getClass());

	private static final ResourceBundle API_BUNDLE = getUtf8Bundle("homepage");

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		String uri = null;
		String contextPath = null;
		Homepage homepage = null;

		uri = request.getRequestURI().substring(request.getContextPath().length());

		Homepage reqHomepage = new Homepage();
		uri = uri.split("/")[1];
		reqHomepage.setContext_path(uri);

		String key;

		if (request.getContextPath() != null && request.getContextPath().length() > 1) {
			key = request.getContextPath().substring(1);
		} else {
			key = request.getRequestURI().split("/")[1];
		}

		try {
			String config = API_BUNDLE.getString(key);
			String[] values = config.split(",");

			reqHomepage.setHomepage_id(values[0]);
			reqHomepage.setHomepage_name(values[1]);
			reqHomepage.setHomepage_eng_name(values[2]);
			reqHomepage.setBoard_type(values[3]);
			reqHomepage.setKiosk_type(values[4]);
			reqHomepage.setMediawall_type(values[5]);
			reqHomepage.setSmartbook_type(values[6]);
			reqHomepage.setHomepage_code(values[7]);
			reqHomepage.setContext_path(uri);

		} catch (Exception e) {
			log.error("homepage.properties 설정 오류 또는 키 없음 : " + key, e);
		}

		homepage = reqHomepage;

		if (homepage != null) {
			HttpSession session = request.getSession();

			request.setAttribute("homepage", homepage);
		}

		return super.preHandle(request, response, handler);
	}


	@Async
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
		String uri = request.getRequestURI().substring(request.getContextPath().length());
		Homepage homepage = (Homepage)request.getAttribute("homepage");
	}

	private static ResourceBundle getUtf8Bundle(String baseName) {
		try {
			return new PropertyResourceBundle(
					new InputStreamReader(
							Thread.currentThread()
									.getContextClassLoader()
									.getResourceAsStream(baseName + ".properties"),
							"UTF-8"));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
