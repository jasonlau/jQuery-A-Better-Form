<!-- 

/* 
    A Better Form - A jQuery plugin
    ==================================================================
    ©2010-2011 JasonLau.biz - Version 1.2.7
    ==================================================================
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

(function($){
    
 	$.fn.extend({ 
 	  
 		abform: function(options){
          var defaults = {
            
            ajax_form : false,
            alert_type : 'js', // 1.2.3 - js or html
            attributes : 'action="#" method="POST"',
            clickonce : true,
            convert : false,
            cookie_field : 'abcookie',
            cookie_name : randomString(5),
            custom_classes : false,
            debug : false, // 1.2.3
            error_class: 'aberror ui-state-error', // 1.2.3
            filtertext : true,
            form_expires : 0, // 1.2.3
            form_id : randomString(10),
            hover_enable : false,
            html : '',
            invalid_alert : true,
            json : false,
            json_form : false,
            multipart : false,
            pluggable : false,
            refresh_expired : false, // 1.2.3
            require_cookies : true,
            sequential_disable : true,              
            serialized : true,
            submit_class : 'absubmit',
            textfilters : 'url=,link=,http:,www.,href,<a',
            validator_class : 'abvalidate', // 1.2.3
            alert_invalid_email : 'Invalid email!',
            alert_invalid_url : 'Invalid URL address!',
            alert_required_field : 'Field is required!',
            alert_invalid_length : 'Field must be at least $ characters in length!',
            alert_invalid_content : 'Invalid field content!',
            alert_invalid_characters_numbers : 'Field accepts numbers only!',
            alert_invalid_characters_letters : 'Field accepts letters only!',
            alert_invalid_characters : 'Field accepts letters and numbers only!',
            alert_invalid_username : 'Field accepts letters, numbers, and underscores only!',
            alert_failed_test : 'Field does not accept the following characters $',
            alert_form_expired : 'The session has expired. Please refresh the webpage.', // 1.2.3
            alert_special_chars : 'Special characters were automatically removed. Try again.',
            authorization_required : 'Authorization required!',
            cookies_required : 'Browser cookies must be enabled to use this form.'
            
          }
            			
			var options = $.extend(defaults, options), auth_f = randomString(Math.random()*20), auth_c = randomString(Math.random()*20), obj = $(this);
            options = $.extend({id : obj.attr('id')}, options);
            var id = options.id;
            if(options.require_cookies){  
                $.cookie(options.cookie_name,auth_f + auth_c);
                if($.cookie(options.cookie_name) != auth_f + auth_c){
                    obj.html(options.cookies_required);
                    return false;
                }
            }    
                
                if(options.html){
                    
                    obj.html(options.html);
                    activate(id);
                    
                } else if(options.ajax_form){

                    $.ajax({
                        url: options.ajax_form,
                        success: function(data) {
                            obj.html(data);
                            activate(id);
                        }
                    });

                } else if(options.json_form){

                    $.getJSON(options.json_form, function(data){
                       obj.html(data.form);
                       activate(id);
                    });

                } else {
                    
                    activate(id);
                    
                } 
                
                if(options.convert){
                    
                    var elements = options.convert.split('{');
                    
                    for(var i in elements){
                      if(i > 0){
                        var element = elements[i].split('}');
                      element = element[0];
                      
                      var e = element.split('|');
                      var e_id = (!e[0]) ? alert('Error! Code misconfiguration. Disable A Better Form convert option or check the documentation to learn how to properly code the convert option. You are missing the element id option.') : e[0];
                      var e_type = (!e[1]) ? alert('Error! Code misconfiguration. Disable A Better Form convert option or check the documentation to learn how to properly code the convert option. You are missing the element type option.') : e[1];    
                      var e_attributes = (e[2]) ? ' ' + e[2] : '';
                      var e_value = $("#" + e_id).html();                      
                      var newElement = '';
                      
                      switch(e_type){
                        
                        case 'text':                        
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        case 'textarea':                        
                        newElement = '<textarea id="' + e_id + '"' + e_attributes + '>' + e_value + '</textarea>';
                        break;
                        
                        case 'password':                        
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        case 'file':                        
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        case 'button':                        
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        case 'submit':                        
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        case 'reset':                   
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        case 'image':                        
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" src="' + e_value + '"' + e_attributes + ' />';
                        break;
                                                
                        case 'radio':                        
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        case 'checkbox':                        
                        newElement = '<input id="' + e_id + '" type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        case 'select':                        
                        newElement = '<select id="' + e_id + '"' + e_attributes + '>';
                        $("#" + e_id + " ul").each(function(){
                            
                            $(this).attr('id','ab-select');
                            
                            if($(this).attr('rel')){
                              newElement += '<optgroup label="' + $(this).attr('rel') + '">';  
                            }
                            
                            $("#ab-select li").each(function(){
                                newElement += '<option value="' + $(this).attr('rel') + '">' + $(this).html() + '</option>';
                            });
                            
                            if($(this).attr('rel')){
                                newElement += '</optgroup>';
                            }
                            
                            $(this).attr('id','');
                            
                        });
                        newElement += '</select>'; 
                        
                        break;
                        
                        case 'hidden':                        
                        newElement = '<input id="' + e_id + '"  type="' + e_type + '" value="' + e_value + '"' + e_attributes + ' />';
                        break;
                        
                        
                      }
                      
                      $("#" + e_id).replaceWith(newElement);
                                            
                      }                    
                  }
                  
                  activate(id);
                  
                }
               
             function activate(id){  
            
                var all_fields = $('#'+id+' input, #'+id+' textarea, #'+id+' select'), all_ids = [];
                                
                $('#'+id+' input, #'+id+' textarea, #'+id+' select').each(function(a){
                    
                    if($(this).is('input') && ($(this).is('input:radio') || $(this).is('input:checkbox'))){
                    if($(this).attr('rel') && (!$(this).attr('name') || $(this).attr('name' == ''))){
                        $("input[rel='"+$(this).attr('rel')+"']").each(function(){
                           $(this).attr('name',$(this).attr('rel')); 
                        });                      
                    } else {
                        if((!$(this).attr('name') || $(this).attr('name' == '') && $(this).attr('id'))){
                           $(this).attr('name',$(this).attr('id')); 
                        }                        
                    }
                    
                    // Radio button group behavior must be simulated when there is no name attribute present.
                    if(!$(this).attr('name') && $(this).attr('rel')){
                    $(this).not("input:checkbox").bind('change',function(){
                       if($(this).is(':checked')){
                        $("input[name='" + $(this).attr('rel') + "']").not(this).prop({checked:false});                       
                       } 
                    });                   
                    }
                }    
                
                var next_item = a+1;
                var next_id = $('#'+all_ids[next_item]).attr('id'); 
  
                    if($(this).is('select') || ($(this).is('input') && ($(this).is('input:file') || $(this).is('input:radio') || $(this).is('input:checkbox')))){
                        
                        $(this).bind('change',function(){
                            if($(this).is('select')){                           
                            if($(this).val() != ''){
                                if($(this).attr('id') && (!$(this).attr('name') || $(this).attr('name') == '')){
                                    $(this).attr('name',$(this).attr('id'));
                                }                                
                                $('#'+all_ids[next_item]).prop({disabled:false});
                                                                            
                            } else {
                                
                                $(this).attr('name','');                               
                             
                            }
                            
                            }
                            
                            if($(this).is(':checkbox') && $(this).hasClass('abcheckall')){
                                var cb_id = $(this).attr('id');
                                $('#' + id + ' input:checkbox').not(this).each(function(){
                                    if($("#" + cb_id).is(':checked')){
                                        $(this).prop({checked:true});
                                    } else {
                                        $(this).prop({checked:false});
                                    }
                                });
                            }
                            
                            if(options.sequential_disable){ seq_dis(id, all_ids); }
                                                    
                        });
                    }
                    
                    if($(this).is('input:text, input:password, input:file, input:hidden, textarea')){
                        $(this).attr('name',$(this).attr('id'));
                        $(this).bind('keyup change',function(){
                            
                            if($(this).val() != ''){
                                
                                if(options.filtertext){
                                    
                                  var t_filters = options.textfilters.split(',');
                                  
                                  for(var i in t_filters){
                                    
                                    var checkit = $(this).val().split(t_filters[i]);
                                    
                                    if(checkit.length > 1){
                                        
                                        $(this).val(checkit[0]);
                                        
                                    }
                                  }  
                                    
                                }
                                                                
                                $('#' + all_ids[next_item]).prop({disabled:false}); 
                                
                            }
                            
                            if(options.sequential_disable){ seq_dis(id, all_ids); } 
                                                   
                        });
                    } 
                    
                    (!$(this).attr('id') || $(this).attr('id') == '') ? $(this).attr('id', randomString(6)) : $(this).attr('id');
                    all_ids.push($(this).attr('id'));
                
                });
                
                if(options.sequential_disable){
                    
                   all_fields.prop({disabled:true});
                   all_fields.first().prop({disabled:false});
                   seq_dis(id, all_ids);
                    
                }
                
                
                if(options.hover_enable){
                    
                $(document).bind('mousemove',function(e){
                    var obj_pos = obj.position(),
                    right = (obj_pos.left + obj.width())+5,
                    bottom = (obj_pos.top + obj.height())+5;                    
                    if((e.pageX > obj_pos.left-5 && e.pageX < right) && (e.pageY > obj_pos.top-5 && e.pageY < bottom)){
                        seq_dis(id, all_ids);                       
                    } else {
                        all_fields.each(function(){
                            var field_pos = $(this).position();
                            if($($(this).attr('id') + '-mask').attr('style') == ''){
                                var bordr = (options.debug) ? ' border:1px solid red;' : '';
                                $('#'+$(this).attr('id')).after('<div class="' + $(this).attr('id') + '-mask" style="position:absolute; top:' + field_pos.top + 'px; left:' + field_pos.left + 'px; width:' + $(this).outerWidth() + 'px; height:' + $(this).outerHeight() + 'px;' + bordr + '"></div>');
                            }
                            $(this).prop({disabled:true});
                        });                        
                    }                                       
                }); 
                }
                
                $('.' + options.validator_class).mouseup(function(){
                    validate(id);
                });
                
                $('#' + id + ' .abselectall').click(function(){
                    $(this).select().focus();
                });
                
                $('#' + id + ' .' + options.submit_class).mousedown(function(e){
                    var pos = $(this).offset(),
                    right = pos.left+$(this).width(),
                    os = $(this).offset(),
                    bottom = os.top+$(this).height();               
                    if(!$('#' + id + ' .' + auth_f).val() && (e.pageX > (pos.left-2) && e.pageX < right) && (e.pageY > (os.top-2) && e.pageY < bottom)){                        
                        obj.append('<input type="hidden" id="' + auth_f + '" class="' + auth_f + '" value="' + auth_c + '" />');  
                    }
                    if(options.debug){
                        $("#abdebug").after('<br />MouseDown:<br /><textarea id="abdebug-mousedown"></textarea>');
                        $("#abdebug-mousedown").val(obj.html()); 
                    }                      
                });
                          
                $('#' + id + ' .' + options.submit_class).mouseup(function(){
                    all_fields.removeClass(options.error_class);
                    if(options.alert_type == 'html') $('.aberror-helper').remove();
                    var formid = $("#" + id + " form").attr('id');
                    var pass = true;
                    pass = pass && $(this).is(':disabled') ? false : true;
                    pass = pass && $('#' + id + ' .' + auth_f).val() == auth_c ? true : false;
                                        
                    if(options.require_cookies){
                        if((auth_f + $('#' + id + ' .' + auth_f).val()) == $.cookie(options.cookie_name)){
                            // pass
                            var cookie_failed = false;
                        } else {
                            pass = false;
                            var cookie_failed = true;
                        }                      
                    }
                    
                    if(pass){
                      if(options.require_cookies){
                        if(!$('#' + id + ' .' + options.cookie_field).val()){
                            $.cookie(options.cookie_field, auth_c);
                            obj.append('<input class="' + options.cookie_field + '" id="' + options.cookie_field + '" name="' + options.cookie_field + '" type="hidden" value="' + auth_c + '" />'); 
                        }
                      }
                                                 
                    pass = validate(id);
                                        
                    if(pass){
                        
                        $('#' + id + ' .' + auth_f).remove();
                                      
                        $('#' + id + ' input').each(function(){
                            if($(this).is(':hidden')){
                              $(this).attr({name : $(this).attr('id')}).prop({disabled:false});
                            }
                        });
                        
                        var innerWrap = (options.multipart) ? "<form id=\"" + options.form_id + "\" " + options.attributes + " enctype=\"multipart/form-data\"></form>" : "<form id=\"" + options.form_id + "\" " + options.attributes + "></form>" ;
                        
                        if(!obj.has("form").length){
                           obj.wrapInner(innerWrap);
                        } 
                                               
                        if(options.pluggable && $.isFunction(options.pluggable)){
                            var runit = true;
                            if(options.debug){
                                var c = confirm("Debug Mode: Do you want to run the Pluggable function?");
                                if(c != true){
                                   runit = false;
                                   if(options.debug){
                                    $("#abdebug-mousedown").after('<br />MouseUp/Submit:<br /><textarea id="abdebug-submit"></textarea><br />');
                                    $("#abdebug-submit").val(obj.html());
                                    } 
                                }
                            }
                            if(runit){
                            if(options.serialized && !options.json){
                                
                                return options.pluggable($(this).closest('form').serialize());
                                 
                            } else if(options.json) {
                                
                                s = $(this).closest('form').serialize().split('&');
                                d = '{';
                                c = s.length-1;
                                for(var i in s){
                                    f = s[i].split('=');
                                    d += '"'+f[0]+'":"'+f[1]+'"'
                                    if(i < c){
                                      d += ',';  
                                    }
                                }
                                d += '}';
                                
                                return options.pluggable(d);
                                
                            } else {
                                
                                return options.pluggable();
                                
                            }                      
                          }  
                        } else {
                           
                           if(options.debug){
                            $("#abdebug-mousedown").after('<br />MouseUp/Submit:<br /><textarea id="abdebug-submit"></textarea><br />');
                            $("#abdebug-submit").val(obj.html());
                           } else {
                            if($.cookie('abclickonce')){
                                options.clickonce = true;
                            }
                            $(this).closest('form').submit();
                           }
                           
                        }
                    } else {
                        if(options.clickonce){
                            $.cookie('abclickonce',true);
                            options.clickonce = false;
                        }
                    }
                    } else {
                        // !pass
                        if(options.require_cookies && cookie_failed){
                            $('#' + id + ' .' + auth_f).remove();
                            $.cookie(options.cookie_name, 0, {expires: -3600});
                            obj.html(options.authorization_required);  
                        }
                        
                    }
                    if(options.clickonce){
                       $(this).prop({disabled:true});
                       $('#'+id+' input, #'+id+' textarea, #'+id+' select').addClass('absubmitted'); 
                        
                    }
                }); // mouseup   
                
                if(options.debug) obj.after('<br />ABetterForm:<br /><textarea id="abdebug" class="abdebug"></textarea>');
                $("#abdebug").val(obj.html());
                
                if(options.form_expires > 0){                    
                    var expire_time = options.form_expires*60000;
                    obj.delay(expire_time).hide('slow',function(){
                       doError($(this), options.alert_form_expired);
                       if(options.refresh_expired) window.location.reload(); 
                    });
                }           

            } // activate
            
            var validate = function(id){
                pass = true;
              $('#' + id + ' .abemail').each(function(){
                        regexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
                        if(!(regexp.test($(this).val()))){
                            pass = false;
                            doError($(this), options.alert_invalid_email);
                        }
                    });
                    
                    $('#' + id + ' .aburl').each(function(){
                        regexp = /^(https?|ftp|mms):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
                        if(!(regexp.test($(this).val()))){
                            pass = false;
                            doError($(this), options.alert_invalid_url);
                        }
                    });
                    
                    $('#' + id + ' .abrequired').each(function(){
                        if($(this).val().length < 1){
                            pass = false;
                            doError($(this), options.alert_required_field)
                        }
                    });
                    
                    $('#' + id + ' .ablength').each(function(){
                        var req_range = $(this).attr('rel').split(','),
                        range_bottom = (req_range[0]) ? req_range[0] : 1;
                        
                        if($(this).val().length > req_range[1] || $(this).val().length < req_range[0]){
                            pass = false;
                            if(req_range[1]){
                               doError($(this), options.alert_invalid_length.replace('$',range_bottom +' - '+ req_range[1])); 
                            } else {
                              doError($(this), options.alert_invalid_length.replace('$',range_bottom));  
                            }
                            
                        }
                    });
                    
                    if(options.custom_regexp != ''){
                       $('#' + id + ' .abcustom').each(function(){
                        regexp = eval($(this).attr('rel'));
                        if(!(regexp.test($(this).val()))){
                            pass = false;
                            doError($(this), options.alert_invalid_content);
                        }
                    }); 
                    }
                    
                    $('#' + id + ' .abnumbers').each(function(){
                        if(isNaN(parseInt($(this).val()))){ // numbers
                            pass = false;
                            doError($(this), options.alert_invalid_characters_numbers);
                        }
                    });
                    
                    $('#' + id + ' .abletters').each(function(){
                        var validChars = /^[a-zA-Z]+$/;
                        if($(this).val().match(validChars)){
                            // passed
                        } else {
                            pass = false;
                            doError($(this), options.alert_invalid_characters_letters);
                        }
                    });
                    
                    $('#' + id + ' .aballnum').each(function(){
                        var invalidChars = /[\W_]/; // letters and numbers
                        if(invalidChars.test($(this).val())){
                            pass = false;
                            doError($(this), options.alert_invalid_characters);  
                        }
                    });
                    
                    $('#' + id + ' .abusername').each(function(){
                        var invalidChars = /\W/; // letters, numbers, and underscores
                        if(invalidChars.test($(this).val())){
                            pass = false;
                            doError($(this), options.alert_invalid_username); 
                        }
                    });
                    
                    $('#' + id + ' .abtest').each(function(){
                        if($(this).attr('rel')){
                            for(var i = 0; i < $(this).val().length; i++){
                                if ($(this).attr('rel').indexOf($(this).val().charAt(i)) != -1){
                                    pass = false;
                                    doError($(this), options.alert_failed_test.replace('$',$(this).attr('rel')))
                                }
                            }
                        }
                    });
                    
                    $('#' + id + ' .abnospecial').each(function(){
                        var original = $(this).val();
                        spec_chars = /\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\_|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
                        $(this).val($(this).val().replace(spec_chars, ""));
                        if($(this).val() != original){
                            pass = false;
                            doError($(this), options.alert_special_chars);
                        }
                    });
                    
                    $('#' + id + ' .abcookie').each(function(){
                        //TODO:Custom cookies
                        //$.cookie()
                    });
                   
                    if(options.custom_classes){
                        var c_classes = options.custom_classes.split('{');
                        c_classes.shift();
                        for(var i in c_classes){
                            var cclass = c_classes[i].split(':');                           
                            var cname = cclass[0];
                            myFunction = eval(cclass[1].replace('}',''));
                            var alert_language = cclass[2];
                            if($.isFunction(myFunction)){
                                $('#' + id + ' .' + cname).each(function(){
                                    var myCallback = myFunction($(this).attr('id'),$(this).val());
                                    if($.type(myCallback) === 'string'){
                                        pass = false;
                                        doError($(this), myCallback);
                                    }
                                }); 
                            }                                                  
                        }
                    }
                    
                    $.cookie('abvalid', pass);
                    return pass;  
            };
            
            var doError = function(object, alertText){
                if(options.invalid_alert){
                    switch(options.alert_type){
                        
                        case 'html':
                        object.after('<div class="' + options.error_class + ' aberror-helper">' + alertText + '</div>');
                        break;
                        
                        default:
                        alert(alertText);
                        
                    }
                }
                object.addClass(options.error_class);
            };
            
            function seq_dis(id, all_ids){
                
                $('#'+id+' input, #'+id+' textarea, #'+id+' select').each(function(b){
                   
                    var sd = false;
                    
                    for(var c in all_ids){
                        
                        if(c < b){
                            
                            if($('#'+all_ids[c]).val() == ''){
                                
                                sd = true;
                                
                            }
                        }
                    }
                    
                    if(sd){
                        $('#' + all_ids[b]).prop({disabled:true});
                        
                        // Masking disabled fixes cross-browser mouse position detection bug
                        var my_pos = $('#' + all_ids[b]).position();
                        
                        if(!$('.' + all_ids[b]+'-mask') || $('.' + all_ids[b]+'-mask').attr('style') == ''){
                            var bordr = (options.debug) ? ' border:1px solid red;' : '';
                            $('#' + all_ids[b]).after('<div class="' + all_ids[b] + '-mask" style="position:absolute; top:' + my_pos.top + 'px; left:' + my_pos.left + 'px; width:' + $(this).outerWidth() + 'px; height:' + $(this).outerHeight() + 'px; ' + bordr + '"></div>');
                        }
                    } else {
                        
                        if($(this).is('input') && ($(this).is('input:radio') || $(this).is('input:checkbox'))){
                            
                          $('[id=' + $(this).attr('id') + ']').each(function(){
                            
                            $(this).prop({disabled:false});
                            $("." + $(this).attr('id') + "-mask").remove();
                            
                          }); 
                           
                        } else {
                        
                          $(this).bind('click keyup',function(){
                            $(this).focus();
                          });
                          
                          $('.' + all_ids[b] + '-mask').remove();  
                          $('#'+all_ids[b]).prop({disabled:false}); 
                                                    
                        }
                    } 
                                           
                });
               
                $('[class=absubmitted]').each(function(){
                    $(this).prop({disabled:true});
                });
                
            };
            
            function randomString(length) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
                if (!length){
                    length = Math.floor(Math.random() * chars.length);
                }
                var str = '';
                for (var i = 0; i < length; i++){
                    str += chars[Math.floor(Math.random() * chars.length)];
                }
                return str;
            }
                                                        
 		}
	});	
    
})(jQuery);

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

 -->