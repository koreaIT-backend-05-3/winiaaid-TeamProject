package com.project.winiaaid.domain.requestInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadServiceDetailRequest {
    private boolean non_member_flag;
    private int user_code;
    private String service_code;
    private String user_name;
    private boolean admin_flag;
}