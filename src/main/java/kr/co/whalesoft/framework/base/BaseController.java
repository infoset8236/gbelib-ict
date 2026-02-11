package kr.co.whalesoft.framework.base;

import javax.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import kr.co.whalesoft.app.cms.login.LoginService;
import kr.co.whalesoft.app.cms.member.Member;
import kr.co.whalesoft.framework.exception.AuthException;

public abstract class BaseController {

	protected final Logger log = LoggerFactory.getLogger(getClass());

	/**
	 * context path를 정보를 반환
	 * @param request
	 * @return
	 */
	@ModelAttribute("getContextPath")
	public String getContextPath(HttpServletRequest request) {
		return request.getContextPath();
	}

	@Autowired
	private LoginService loginServiceBase;

	public String getSessionMemberId(HttpServletRequest request) {
		return loginServiceBase.getSessionMember(request).getMember_id();
	}

	public String getSessionUserId(HttpServletRequest request) {
		return loginServiceBase.getSessionMember(request).getUser_id();
	}

	public String getSessionWebId(HttpServletRequest request) {
		return loginServiceBase.getSessionMember(request).getWeb_id();
	}

	public String getSessionUserSeqNo(HttpServletRequest request) {
		return loginServiceBase.getSessionMember(request).getSeq_no();
	}

	public boolean getSessionIsAdmin(HttpServletRequest request) {
		Member member = (Member) loginServiceBase.getSessionMember(request);
		if (member == null) {
			return false;
		}
		return member.isAdmin();
	}

	public String getSessionMemberLoginType(HttpServletRequest request) {
		Member member = (Member) loginServiceBase.getSessionMember(request);
		return member.getLoginType();
	}

	public Member getSessionMemberInfo(HttpServletRequest request) {
		Member member = (Member) loginServiceBase.getSessionMember(request);
		return member;
	}

	public boolean isLogin(HttpServletRequest request) {
		Member member = (Member) loginServiceBase.getSessionMember(request);
		if (member == null) {
			return false;
		}
		return member.isLogin();
	}

	/**
	 * 현재 관리중인 홈페이지 ID를 가져온다.
	 * @param request
	 * @return
	 */
	public String getAsideHomepageId(HttpServletRequest request) {
		String asideHomepageId = String.valueOf(request.getSession().getAttribute("asideHomepageId"));
		if (StringUtils.isEmpty(asideHomepageId) || StringUtils.equalsIgnoreCase(asideHomepageId, "null")) {
			return null;
		}
		return String.valueOf(request.getSession().getAttribute("asideHomepageId"));
	}

	/**
	 * 권한체크. 기본메시지 : '권한이 없습니다.'
	 * @param authCode  R : 조회권한, C : 쓰기권한, U : 수정권한, D : 삭제권한
	 * @param model
	 * @param request
	 * @throws AuthException
	 */
	public void checkAuth(String authCode, Model model, HttpServletRequest request) throws AuthException{
		checkAuth(authCode, model, request, null);
	}

	/**
	 *
	 * @param authCode  R : 조회권한, C : 쓰기권한, U : 수정권한, D : 삭제권한
	 * @param model
	 * @param request
	 * @param msg
	 * @throws AuthException
	 */
	@SuppressWarnings ("unchecked")
	public void checkAuth(String authCode, Model model, HttpServletRequest request, String msg) throws AuthException{

	}

}
