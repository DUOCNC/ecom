import {HistorySearchResponse} from '../responses';

/**
 * History Search Product Entity
 */
export default class HistorySearchEntity {
  /**
   * Id lịch sử tìm kiếm
   */
  private id: number;
  /**
   * Data bổ sung lịch sử tìm kiếm
   */
  private data: string;
  /**
   * Từ khóa tìm kiếm
   */
  private keyword: string;
  /**
   * Tìm kiếm bởi ai
   */
  private searchBy: string;
  /**
   * Tìm kiếm khi nào
   */
  private searchDate: string;
  /**
   * Tên người tìm kiếm
   */
  private searchName: string;
  /**
   * Loại tìm kiếm
   */
  private type: string;

  private constructor(
    id: number,
    data: string,
    keyword: string,
    searchBy: string,
    searchDate: string,
    searchName: string,
    type: string,
  ) {
    this.id = id;
    this.data = data;
    this.keyword = keyword;
    this.searchBy = searchBy;
    this.searchDate = searchDate;
    this.searchName = searchName;
    this.type = type;
  }

  static create(historySearch: HistorySearchResponse) {
    // let data = ProductHistoryEntity.createByString(historySearch.data);
    return new HistorySearchEntity(
      historySearch.id,
      '',
      historySearch.keyword,
      historySearch.searchBy,
      historySearch.searchDate,
      historySearch.searchName,
      historySearch.type,
    );
  }

  getId() {
    return this.id;
  }

  getKeyExtractor() {
    return this.id.toString();
  }

  getKeyword() {
    return this.keyword.trim();
  }
}
