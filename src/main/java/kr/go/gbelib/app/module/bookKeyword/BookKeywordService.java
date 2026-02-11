package kr.go.gbelib.app.module.bookKeyword;

import kr.co.whalesoft.framework.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookKeywordService extends BaseService{

	@Autowired
	private BookKeywordDao dao;

	public List<BookKeyword> getBookKeywordList(BookKeyword bookKeyword) {
		return dao.getBookKeywordList(bookKeyword);
	}
}
