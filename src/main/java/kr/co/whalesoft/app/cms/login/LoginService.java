package kr.co.whalesoft.app.cms.login;

import kr.co.whalesoft.app.cms.member.Member;
import kr.co.whalesoft.framework.base.BaseService;
import kr.co.whalesoft.framework.utils.StaticVariables;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class LoginService extends BaseService {

	@Transactional(readOnly = true)
	public String login(Member getMember, HttpServletRequest request) throws Exception {

		return "LOGIN";
	}

	public void logout(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.invalidate();
	}

	public void setSessionMember(Member member, HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setAttribute(StaticVariables.MEMBER, member);
	}

	public Member getSessionMember(HttpServletRequest request) {
		HttpSession session = request.getSession();
		return (Member)session.getAttribute(StaticVariables.MEMBER);
	}
}
