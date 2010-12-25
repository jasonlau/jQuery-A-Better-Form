<!-- 

/* 
    A Better Form - A jQuery plugin
    ==================================================================
    ©2010 JasonLau.biz - Version 1.2.2
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
            attributes : 'action="#" method="POST"',
            clickonce : true,
            convert : false,
            cookie_field : 'abcookie',
            cookie_name : randomString(5),
            custom_classes : false,
            filtertext : true,
            form_id : randomString(10),
            hover_enable : false,
            html : '',
            invalid_alert : true,
            json : false,
            json_form : false,
            multipart : false,
            pluggable : false,
            require_cookies : true,
            sequential_disable : true,              
            serialized : true,
            submit_class : 'absubmit',
            textfilters : 'url=,link=,http:,www.,href,<a',
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
            alert_special_chars : 'Special characters were automatically removed. Try again.',
            authorization_required : 'Authorization required!',
            cookies_required : 'Browser cookies must be enabled to use this form.'
            
          }
            				
			var options = $.extend(defaults, options), obj = $(this), id = obj.attr('id'), auth_f = randomString(Math.random()*20), auth_c = randomString(Math.random()*20);
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
                    if($(this).attr('rel')){
                        $("input[rel='"+$(this).attr('rel')+"']").each(function(){
                           $(this).attr('name',$(this).attr('rel')); 
                        });                      
                    } else {
                        $(this).attr('name',$(this).attr('id'));
                    }
                    
                    $(this).not("input:checkbox").bind('change',function(){
                       if($(this).is(':checked')){
                        $("input[name='" + $(this).attr('rel') + "']").not(this).attr('checked','');                       
                       } 
                    });                   
                }
                    var next_item = a+1;
                    var next_id = $('#'+all_ids[next_item]).attr('id'); 
  
                    if($(this).is('select') || ($(this).is('input') && ($(this).is('input:file') || $(this).is('input:radio') || $(this).is('input:checkbox')))){
                        
                        $(this).bind('change',function(){
                            if($(this).is('select')){                           
                            if($(this).val() != ''){
                                
                                $(this).attr('name',$(this).attr('id'));
                                $('#'+all_ids[next_item]).attr('disabled', '');
                                                                            
                            } else {
                                
                                $(this).attr('name','');                               
                             
                            }
                            
                            }
                            
                            if($(this).is(':checkbox') && $(this).hasClass('abcheckall')){
                                var cb_id = $(this).attr('id');
                                $('#' + id + ' input:checkbox').not(this).each(function(){
                                    if($("#" + cb_id).is(':checked')){
                                        $(this).attr('checked','checked');
                                    } else {
                                        $(this).attr('checked','');
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
                                                                
                                $('#' + all_ids[next_item]).attr('disabled', ''); 
                                
                            }
                            
                            if(options.sequential_disable){ seq_dis(id, all_ids); } 
                                                   
                        });
                    } 
                    
                    
                    all_ids.push($(this).attr('id'));
                
                });
                
                if(options.sequential_disable){
                    
                   all_fields.attr('disabled', 'disabled');
                   all_fields.first().attr('disabled', '');
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
                                $('#'+$(this).attr('id')).after('<div class="' + $(this).attr('id') + '-mask" style="position:absolute; top:' + field_pos.top + 'px; left:' + field_pos.left + 'px; width:' + $(this).outerWidth() + 'px; height:' + $(this).outerHeight() + 'px;"></div>');
                            }
                            $(this).attr('disabled','disabled');
                        });                        
                    }                                       
                }); 
                }
                
                $('#' + id + ' .abselectall').click(function(){
                    $(this).select().focus();
                });
               
                $('#' + id + ' .' + options.submit_class).mousedown(function(e){
                    var pos = $(this).position(),
                    right = pos.left+$(this).outerWidth(),
                    bottom = pos.top+$(this).outerHeight();                   
                    if(!$('#' + id + ' .' + auth_f).val() && (e.pageX > pos.left && e.pageX < right) && (e.pageY > pos.top && e.pageY < bottom)){
                        obj.append('<input type="hidden" id="' + auth_f + '" class="' + auth_f + '" value="' + auth_c + '" />');
                    }                    
                });
                          
                $('#' + id + ' .' + options.submit_class).mouseup(function(){
                    all_fields.removeClass('aberror');
                    var formid = $("#" + id + " form").attr('id');
                    var pass = true;
                    pass = pass && $(this).is(':disabled') ? false : true;                    
                    if(formid == undefined){
                       pass = pass && ($(this).parent().attr('id') == obj.attr('id')) ? true : false;                        
                    } else {                        
                       pass = pass && (formid == $(this).parent().attr('id')) ? true : false; 
                    }
                                       
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
                            obj.append('<input class="' + options.cookie_field + '" id="' + options.cookie_field + '" name="' + options.cookie_field + '" type="hidden" value="' + auth_c + '" />'); 
                        }
                      }
                                                 
                    $('#' + id + ' .abemail').each(function(){
                        regexp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
                        if(!(regexp.test($(this).val()))){
                            pass = false;
                            if(options.invalid_alert) alert(options.alert_invalid_email);
                            $(this).addClass('aberror');
                        }
                    });
                    
                    $('#' + id + ' .aburl').each(function(){
                        regexp = /^(https?|ftp|mms):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
                        if(!(regexp.test($(this).val()))){
                            pass = false;
                            if(options.invalid_alert) alert(options.alert_invalid_url);
                            $(this).addClass('aberror');
                        }
                    });
                    
                    $('#' + id + ' .abrequired').each(function(){
                        if($(this).val().length < 1){
                            pass = false;
                            if(options.invalid_alert) alert(options.alert_required_field);
                            $(this).addClass('aberror');
                        }
                    });
                    
                    $('#' + id + ' .ablength').each(function(){
                        var req_range = $(this).attr('rel').split(','),
                        range_bottom = (req_range[0]) ? req_range[0] : 1;
                        
                        if($(this).val().length > req_range[1] || $(this).val().length < req_range[0]){
                            pass = false;
                            if(req_range[1]){
                               if(options.invalid_alert) alert(options.alert_invalid_length.replace('$',range_bottom +' - '+ req_range[1])); 
                            } else {
                              if(options.invalid_alert) alert(options.alert_invalid_length.replace('$',range_bottom));  
                            }
                            
                            $(this).addClass('aberror');
                        }
                    });
                    
                    if(options.custom_regexp != ''){
                       $('#' + id + ' .abcustom').each(function(){
                        regexp = eval($(this).attr('rel'));
                        if(!(regexp.test($(this).val()))){
                            pass = false;
                            if(options.invalid_alert) alert(options.alert_invalid_content);
                            $(this).addClass('aberror');
                        }
                    }); 
                    }
                    
                    $('#' + id + ' .abnumbers').each(function(){
                        if(isNaN(parseInt($(this).val()))){ // numbers
                            pass = false;
                            if(options.invalid_alert) alert(options.alert_invalid_characters_numbers);
                            $(this).addClass('aberror');  
                        }
                    });
                    
                    $('#' + id + ' .abletters').each(function(){
                        var validChars = /^[a-zA-Z]+$/;
                        if($(this).val().match(validChars)){
                            // passed
                        } else {
                            pass = false;
                            if(options.invalid_alert) alert(options.alert_invalid_characters_letters);
                            $(this).addClass('aberror');
                        }
                    });
                    
                    $('#' + id + ' .aballnum').each(function(){
                        var invalidChars = /[\W_]/; // letters and numbers
                        if(invalidChars.test($(this).val())){
                            pass = false;
                            if(options.invalid_alert) alert(options.alert_invalid_characters);
                            $(this).addClass('aberror');  
                        }
                    });
                    
                    $('#' + id + ' .abusername').each(function(){
                        var invalidChars = /\W/; // letters, numbers, and underscores
                        if(invalidChars.test($(this).val())){
                            pass = false;
                            if(options.invalid_alert) alert(options.alert_invalid_username);
                            $(this).addClass('aberror');  
                        }
                    });
                    
                    $('#' + id + ' .abtest').each(function(){
                        if($(this).attr('rel')){
                            for(var i = 0; i < $(this).val().length; i++){
                                if ($(this).attr('rel').indexOf($(this).val().charAt(i)) != -1){
                                    pass = false;
                                    if(options.invalid_alert) alert(options.alert_failed_test.replace('$',$(this).attr('rel')));
                                    $(this).addClass('aberror');
                                }
                            }
                        }
                    });
                    
                    $('#' + id + ' .abnospecial').each(function(){
                        var original = $(this).val();
                        spec_chars = /\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\_|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
                        $(this).val($(this).val().replace(spec_chars, ""));
                        if($(this).val() != original){                          
                           if(options.invalid_alert) {
                            alert(options.alert_special_chars);
                            pass = false;
                           }
                           $(this).addClass('aberror'); 
                        }
                    });
                    
                    $('#' + id + ' .abcookie').each(function(){
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
                                        if(options.invalid_alert){
                                            alert(myCallback);
                                            pass = false;
                                        }
                                        $(this).addClass('aberror');
                                    }
                                }); 
                            }                                                  
                        }
                    }
                                        
                    if(pass){
                        $('#' + id + ' .' + auth_f).remove();
                                      
                        $('#' + id + ' input').each(function(){
                            if($(this).is(':hidden')){
                              $(this).attr({
                                disabled : '',
                                name : $(this).attr('id')
                                });  
                            }
                        });
                        
                        var innerWrap = (options.multipart) ? "<form id=\"" + options.form_id + "\" " + options.attributes + " enctype=\"multipart/form-data\"></form>" : "<form id=\"" + options.form_id + "\" " + options.attributes + "></form>" ;
                        
                        if(!obj.has("form").length){
                           obj.wrapInner(innerWrap);
                        } 
                                               
                        if(options.pluggable && $.isFunction(options.pluggable)){
                            
                            if(options.serialized && !options.json){
                                
                                return options.pluggable($(this).parent().serialize());
                                 
                            } else if(options.json) {
                                
                                s = $(this).parent().serialize().split('&');
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
                            
                        } else {
                           
                           $(this).parent().submit(); 
                           
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
                       $(this).attr('disabled','disabled');
                       $('#'+id+' input, #'+id+' textarea, #'+id+' select').addClass('absubmitted'); 
                        
                    }
                }); // mouseup                

            } // activate 
             
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
                        
                        $('#' + all_ids[b]).attr('disabled', 'disabled');
                        // Masking disabled fixes cross-browser mouse position detection bug
                        var my_pos = $('#' + all_ids[b]).position();
                        if($('.' + all_ids[b]+'-mask').attr('style') == ''){
                          $('#' + all_ids[b]).after('<div class="' + all_ids[b] + '-mask" style="position:absolute; top:' + my_pos.top + 'px; left:' + my_pos.left + 'px; width:' + $(this).outerWidth() + 'px; height:' + $(this).outerHeight() + 'px;"></div>');  
                        }
                                              
                   } else {
                        
                        if($(this).is('input') && ($(this).is('input:radio') || $(this).is('input:checkbox'))){
                            
                          $('[id=' + $(this).attr('id') + ']').each(function(){
                            
                            $(this).attr('disabled', '');
                            $("." + $(this).attr('id') + "-mask").remove();
                            
                          }); 
                           
                        } else {
                        
                          $(this).bind('click keyup',function(){
                            $(this).focus();
                          });
                          
                          $('.' + all_ids[b] + '-mask').remove();  
                          $('#'+all_ids[b]).attr('disabled', ''); 
                                                    
                        }
                        
                    } 
                                          
                });
                $('[class=absubmitted]').each(function(){
                    $(this).attr('disabled', 'disabled');
                });
            };
            
            function randomString(length) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
                if (! length) {
                    length = Math.floor(Math.random() * chars.length);
                    }
                    var str = '';
                    for (var i = 0; i < length; i++) {
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