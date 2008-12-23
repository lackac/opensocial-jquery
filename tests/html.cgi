#!/usr/bin/perl
#!perl
##
## opensocial-jquery
## http://code.google.com/p/opensocial-jquery/
##
## Copyright(C) 2008 LEARNING RESOURCE LAB
## http://friendfeed.com/nakajiman
## http://hp.submit.ne.jp/d/16750/
##
## Dual licensed under the MIT and GPL licenses:
## http://www.opensource.org/licenses/mit-license.php
## http://www.gnu.org/licenses/gpl.html
##
use strict;
use CGI;
$CGI::DISABLE_UPLOADS = 1;
$CGI::POST_MAX=1024*1024*1; #1MB

my $cgi = CGI->new();

print $cgi->header(
  -type => 'text/html',
  -charset => 'utf-8',
# -status => '304 Not Modified',
# -last_modified => 'Thu, 20 Nov 2008 00:41:32 GMT',
);

print <<EOB;
<div>jQuery.ajax is succeeded.</div>
EOB

#use lib qw(../../../extlib);
#use CGI qw(:standard);

#print ul(
#  map {
#    li( escapeHTML($_ . ': ' . $ENV{$_}) )
#  } keys %ENV
#);

#print ul(
#  map {
#    li( escapeHTML($_ . ': ' . $cgi->http($_)) )
#  } $cgi->http()
#);

#print ul(
#  map { 
#    li( escapeHTML($_ . '=' . $cgi->param($_)))
#  } $cgi->param()
#);

1;
