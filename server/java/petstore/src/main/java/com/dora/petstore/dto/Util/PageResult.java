package com.dora.petstore.dto.Util;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PageResult<T> {
    List<T> list;
    long total;
    int pageSize;
    int pageIndex;
}
