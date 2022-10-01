package com.project.winiaaid.service.auth;

import com.project.winiaaid.domain.user.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Data
public class PrincipalDetails implements UserDetails {
	
	private static final long serialVersionUID = 1L;

	private User user;
	private Map<String, Object> attribute;
	
	public PrincipalDetails(User user) {
		this.user = user;
	}
	
	public PrincipalDetails(User user, Map<String, Object> attribute) {
		this.user = user;
		this.attribute = attribute;
	}
 
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		Collection<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
	
//		grantedAuthorities.add(new GrantedAuthority() {
//			
//			@Override
//			public String getAuthority() {
//				
//				return user.getUser_roles();
//			}
//		});
//		return grantedAuthorities;
		user.getUserRoles().forEach(role -> {
			grantedAuthorities.add(() -> role);
		});
		
		return grantedAuthorities;
		
//	
		
	}
	
	@Override
	public String getPassword() {
		return user.getUser_password();
	}
	
	@Override
	public String getUsername() {
		return user.getUser_id();
	}
	
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return true;
	}
	
	
}